import { useEffect, useState } from 'react';
import s from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  ref,
  onValue,
  push,
  set,
  remove,
  orderByChild,
  query,
  startAt,
  endAt,
  orderByKey,
  get,
} from 'firebase/database';
import { db } from './firebase';
function App() {
  const [todos, setTodos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    id: todos?.length + 1,
    title: '',
    completed: false,
  });
  const [queryItem, setQueryItem] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');

  const todosDbRef = ref(db, 'todos');

  const getTodos = () => {
    setIsLoading(true);
    return onValue(todosDbRef, snapshot => {
      setIsLoading(true);
      const loadedTodos = snapshot.val() || {};
      setTodos(loadedTodos);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleDeleteTodo = async id => {
    const singleTodoRef = ref(db, `todos/${id}`);
    remove(singleTodoRef);
  };

  const handleCreateTodo = () => {
    if (!currentTodo.title.trim()) return;
    const newTodo = {
      title: currentTodo.title,
      completed: false,
    };
    push(todosDbRef, newTodo);
    setCurrentTodo(prevState => ({ ...prevState, title: '' }));
  };

  const handleUpdateTodo = (id, title) => {
    const updatedTodo = { id, title, completed: false };
    const singleTodoRef = ref(db, `todos/${id}`);
    set(singleTodoRef, updatedTodo);
  };

  const handleInputChange = e => {
    setCurrentTodo(prev => ({ ...prev, title: e.target.value }));
  };

  const handleSearch = e => {};

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceQuery(queryItem);
    }, 500);
    return () => {
      clearTimeout(handleDebounce);
    };
  }, [queryItem]);

  const onSearch = () => {
    const searchRef = query(
      ref(db, 'todos'),
      orderByChild('title'),
      startAt(debounceQuery),
      endAt(debounceQuery + '\uf8ff'),
    );
    return onValue(
      searchRef,
      snapshot => {
        let results = {};
        snapshot.forEach(childSnapshot => {
          results[childSnapshot.key] = { ...childSnapshot.val() };
        });
        console.log('Search results:', results);
        setTodos(results);
      },
      error => {
        console.error('Search failed:', error);
      },
    );
  };

  useEffect(() => {
    if (debounceQuery) {
      onSearch();
    } else {
      getTodos();
    }
  }, [debounceQuery]);

  const sortByAlphabet = () => {
    const sortedQuery = query(todosDbRef, orderByChild('title'));
    setIsSorted(!isSorted);
    if (!isSorted) {
      onValue(sortedQuery, snapshot => {
        const sortedData = {};
        snapshot.forEach(childSnapshot => {
          sortedData[childSnapshot.key] = childSnapshot.val();
        });
        setTodos(sortedData);
      });
    } else {
      getTodos();
    }
  };

  return (
    <div>
      <div className="border-2 w-full bg-amber-100 p-4">
        <h1 className="text-3xl font-bold py-2">Todo List</h1>
        <div className="flex gap-3 my-2 items-center content-center">
          <input
            className="border-2 outline-1 rounded-lg w-1/4 p-2"
            type="text"
            name="title"
            value={currentTodo.title}
            placeholder="Enter todo title"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="hover:!text-green-500 text-white px-3 p-2 rounded-lg"
            onClick={handleCreateTodo}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <input
            type="text"
            placeholder="search"
            className="border-2 rounded-lg p-2"
            value={queryItem}
            onChange={e => setQueryItem(e.target.value)}
          />
          <label htmlFor="" className="flex gap-2 items-center font-bold">
            Sort by Alphabet
            <input type="checkbox" ischecked={isSorted} onChange={sortByAlphabet} />
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <div className={s.loader}></div>
          ) : Object.entries(todos).length > 0 ? (
            Object.entries(todos).map(([id, { title }]) => (
              <div
                key={id}
                className="border-2 py-3 px-2 rounded-lg  min-w-[400px] flex-wrap w-1/4 box-border"
              >
                <div className="flex justify-between items-center">
                  <span className="overflow-ellipsis w-fit overflow-hidden whitespace-nowrap">
                    {title}
                  </span>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="hover:!text-blue-500 text-white p-2 px-3 rounded-lg"
                      onClick={() => handleUpdateTodo(id, prompt('New title:', title))}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      type="button"
                      className="hover:!text-red-500 text-white p-2 px-3 rounded-lg"
                      onClick={() => handleDeleteTodo(id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={s.noTodos}>No todos yet!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
