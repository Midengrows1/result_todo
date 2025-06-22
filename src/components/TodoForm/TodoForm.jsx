import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Field } from '../Field/Field';
import { Button } from '../Button/Button';
import { ButtonClass } from '../../App';
import { AppContext } from '../../context';
export const TodoForm = () => {
  const { onAdd, onSort, setCurrentTodo, currentTodo, setDebounceQuery } = useContext(AppContext);
  const handleInputChange = e => {
    setCurrentTodo(prev => ({ ...prev, title: e.target.value }));
  };
  const [queryItem, setQueryItem] = useState('');
  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceQuery(queryItem);
    }, 500);
    return () => {
      clearTimeout(handleDebounce);
    };
  }, [queryItem]);
  const handleTodoAdd = e => {
    e.preventDefault();
    onAdd();
  };
  return (
    <div className="flex gap-3 my-2 items-center content-center flex-1">
      <form action="#" className="flex gap-3 my-2 items-center flex-1">
        <Field
          className="flex-1 border-2 outline-1 rounded-lg w-1/4 p-2"
          type="text"
          name="title"
          value={currentTodo.title}
          placeholder="Enter todo title"
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className={ButtonClass + ` hover:!text-green-500 text-white px-3 p-2 rounded-lg`}
          onClick={handleTodoAdd}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </form>
      <Field
        type="text"
        placeholder="search..."
        className="border-2 rounded-lg p-2"
        value={queryItem}
        onChange={e => setQueryItem(e.target.value)}
      />
      |
      <Button onClick={onSort} type="button" className={ButtonClass}>
        Sort
      </Button>
    </div>
  );
};
