import { useEffect, useState } from 'react';
import s from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    id: todos.length + 1,
    title: '',
    completed: false,
  });
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');

  const makeRequest = async (method = 'GET', body = null, endpoint = 'todos') => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };

  const getTodos = async () => {
    setIsLoading(true);
    const data = await makeRequest();
    setTodos(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleDeleteTodo = async id => {
    await makeRequest('DELETE', null, `todos/${id}`);
  };

  const handleCreateTodo = async event => {
    if (!currentTodo.title.trim()) return;
    const newTodo = {
      title: currentTodo.title,
      completed: false,
    };
    await makeRequest('POST', newTodo);
  };

  const handleUpdateTodo = async (id, title) => {
    const updatedTodo = { id, title, completed: false };
    await makeRequest('PUT', updatedTodo, `todos/${id}`);
  };

  const handleInputChange = e => {
    setCurrentTodo(prev => ({ ...prev, title: e.target.value }));
  };

  const handleSearch = e => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);
    return () => {
      clearTimeout(handleDebounce);
    };
  }, [query]);

  const onSearch = async () => {
    const data = await makeRequest('GET', null, `todos?title=${query}`);
    setTodos(data);
  };
  useEffect(() => {
    if (debounceQuery) {
      onSearch();
    } else {
      getTodos();
    }
  }, [debounceQuery]);

  const sortByAlphabet = async () => {
    setIsSorted(!isSorted);
    if (!isSorted) {
      const data = await makeRequest('GET', null, `todos?_sort=title`);
      setTodos(data);
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
            value={query}
            onChange={handleSearch}
          />
          <label htmlFor="" className="flex gap-2 items-center font-bold">
            Sort by Alphabet
            <input type="checkbox" ischecked={isSorted} onChange={sortByAlphabet} />
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <div className={s.loader}></div>
          ) : todos.length > 0 ? (
            todos.map(({ id, title }) => (
              <div key={id} className="border-2 py-3 px-2 rounded-lg w-1/4 box-border">
                <div className="flex justify-between items-center">
                  <span>{title}</span>
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
