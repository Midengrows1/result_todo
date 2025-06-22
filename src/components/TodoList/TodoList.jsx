import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';
import { TodoItem } from '../TodoItem/TodoItem';
import { useContext } from 'react';
import { AppContext } from '../../context';

export const Todolist = () => {
  const navigate = useNavigate();
  const { todos, isLoading } = useContext(AppContext);
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-wrap gap-4">
      {todos.map((todoItem, index) => (
        <TodoItem
          key={index}
          todoItem={todoItem}
          onClick={() => {
            navigate(`todos/${todoItem.id}`);
          }}
        />
      ))}
    </div>
  );
};
