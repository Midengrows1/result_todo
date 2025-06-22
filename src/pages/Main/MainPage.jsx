import { TodoForm } from '../../components/TodoForm/TodoForm';
import { Todolist } from '../../components/TodoList/TodoList';
import { useTodos } from '../../hooks/useTodos';
import { useEffect } from 'react';
import { AppContext } from '../../context';
export const MainPage = () => {
  const {
    todos,
    isLoading,
    currentTodo,
    setCurrentTodo,
    getTodos,
    handleDeleteTodo,
    handleUpdateTodo,
    handleCreateTodo,
    setDebounceQuery,
    sortByAlphabet,
  } = useTodos();
  const contextValue = {
    todos,
    isLoading,
    currentTodo,
    setCurrentTodo,
    getTodos,
    handleDeleteTodo,
    handleUpdateTodo,
    handleCreateTodo,
    setDebounceQuery,
    sortByAlphabet,
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="border-2 w-full min-h-screen bg-gradient-to-br from-yellow-400 to-amber-500 p-4">
      <h1 className="text-3xl font-bold py-2">Todo List</h1>
      <div className="flex  flex-col flex-wrap gap-4">
        <AppContext.Provider value={contextValue}>
          <TodoForm />
          <Todolist />
        </AppContext.Provider>
      </div>
    </div>
  );
};
