import { useEffect, useState } from 'react';
import { TodoForm, Todolist } from './components';
import { useTodos } from './hooks/useTodos';
export const ButtonClass = 'px-2 py-2 rounded-xl bg-black text-white  cursor-pointer';
function App() {
  const {
    todos,
    isLoading,
    currentTodo,
    getTodos,
    handleDeleteTodo,
    handleUpdateTodo,
    handleCreateTodo,
    onSearch,
    sortTodos,
    setCurrentTodo,
    debounceQuery,
    setDebounceQuery,
  } = useTodos();
  useEffect(() => {
    getTodos();
  }, []);
  useEffect(() => {
    if (debounceQuery) {
      onSearch();
    } else {
      getTodos();
    }
  }, [debounceQuery]);

  return (
    <div>
      <div className="border-2 w-full bg-amber-100 p-4">
        <h1 className="text-3xl font-bold py-2">Todo List</h1>
        <div className="flex  flex-col flex-wrap gap-4">
          <TodoForm
            onAdd={handleCreateTodo}
            onSort={sortTodos}
            setCurrentTodo={setCurrentTodo}
            singleTodo={currentTodo}
            setDebounceQuery={setDebounceQuery}
          />
          <Todolist
            todos={todos}
            isLoading={isLoading}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
            setCurrentTodo={setCurrentTodo}
            singleTodo={currentTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
