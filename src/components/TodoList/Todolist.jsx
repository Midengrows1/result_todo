import { TodoItem } from '../TodoItem/TodoItem';

export const Todolist = ({ todos, isLoading, onUpdate, onDelete, setCurrentTodo, singleTodo }) => {
  if (isLoading) return '...Загрузка';
  if (!Object.entries(todos).length) return 'Список пуст';
  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(todos).map(([id, { title, completed }]) => (
        <TodoItem
          key={id}
          id={id}
          todoTitle={title}
          onDelete={onDelete}
          onUpdate={onUpdate}
          singleTodo={singleTodo}
          completed={completed}
          setCurrentTodo={setCurrentTodo}
        />
      ))}
    </div>
  );
};
