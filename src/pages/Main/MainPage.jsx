import { TodoForm } from '../../components/TodoForm/TodoForm';
import { Todolist } from '../../components/TodoList/TodoList';
export const MainPage = () => {
  return (
    <div className="border-2 w-full min-h-screen bg-gradient-to-br from-yellow-400 to-amber-500 p-4">
      <h1 className="text-3xl font-bold py-2">Todo List</h1>
      <div className="flex  flex-col flex-wrap gap-4">
        <TodoForm />
        <Todolist />
      </div>
    </div>
  );
};
