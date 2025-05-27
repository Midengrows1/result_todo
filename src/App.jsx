import { useEffect, useState } from 'react';
import s from './App.module.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function getTodos() {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.error('Data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <div className="border-2 w-full bg-amber-100 p-4">
        <h1 className="text-3xl font-bold py-2">Todo List</h1>
        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <div className={s.loader}></div>
          ) : !!todos.length ? (
            todos.map(({ id, title }) => (
              <div key={id} className="border-2 py-3 pl-2 rounded-lg flex-1/4 ">
                {title}
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
