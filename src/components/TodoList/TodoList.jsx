import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';
import { TodoItem } from '../TodoItem/TodoItem';

export const Todolist = ({ todos, isLoading, onUpdate, onDelete, setCurrentTodo, singleTodo }) => {
  const navigate = useNavigate();
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-wrap gap-4">
      {todos.map((todoItem, index) => (
        <TodoItem
          key={index}
          onDelete={onDelete}
          onUpdate={onUpdate}
          singleTodo={singleTodo}
          setCurrentTodo={setCurrentTodo}
          todoItem={todoItem}
          onClick={() => {
            navigate(`todos/${todoItem.id}`);
          }}
        />
      ))}
    </div>
  );
};
