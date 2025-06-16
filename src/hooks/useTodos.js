import { useCallback, useEffect, useState } from 'react';
const API_URL = '/api/todos';
export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [debounceQuery, setDebounceQuery] = useState('');
  const [currentTodo, setCurrentTodo] = useState({
    id: todos?.length + 1,
    title: '',
    completed: false,
  });

  const makeRequest = async (method = 'GET', body = null, params = '') => {
    try {
      const response = await fetch(`${API_URL}/${params}`, {
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
      console.log('Fetch error:', error);
    }
  };

  const getTodos = async () => {
    setIsLoading(true);
    const data = await makeRequest();
    setTodos(data);
    setIsLoading(false);
  };
  const handleDeleteTodo = async id => {
    await makeRequest('DELETE', null, `${id}`);
    setTodos(prevState => prevState.filter(todo => todo.id !== id));
    getTodos();
  };
  const handleCreateTodo = async () => {
    if (!currentTodo.title.trim()) return;
    const newTodo = {
      title: currentTodo.title,
      completed: false,
    };
    await makeRequest('POST', newTodo);
    setTodos(prevState => [newTodo, ...prevState]);
  };

  const handleUpdateTodo = async todoItem => {
    await makeRequest('PUT', todoItem, `${todoItem.id}`);
    setTodos(prevState =>
      prevState.map(todo => (todo.id === todoItem.id ? { ...todo, ...todoItem } : todo)),
    );
  };
  const onSearch = async () => {
    if (debounceQuery) {
      const data = await makeRequest('GET', null, `?q=${debounceQuery}`);
      setTodos(data);
    } else {
      getTodos();
    }
  };
  const sortByAlphabet = async () => {
    setIsSorted(!isSorted);
    if (!isSorted) {
      const data = await makeRequest('GET', null, `?_sort=title`);
      setTodos(data);
    } else {
      getTodos();
    }
  };
  const getSingleTodo = useCallback(async todoId => {
    setIsLoading(true);
    const data = await makeRequest('GET', null, `${todoId}`);
    setIsLoading(false);
    return data;
  }, []);
  useEffect(() => {
    onSearch();
  }, [debounceQuery]);
  const sortTodos = () => {};
  return {
    todos,
    isLoading,
    currentTodo,
    setCurrentTodo,
    getTodos,
    handleDeleteTodo,
    handleUpdateTodo,
    handleCreateTodo,
    sortTodos,
    debounceQuery,
    setDebounceQuery,
    sortByAlphabet,
    getSingleTodo,
  };
}
