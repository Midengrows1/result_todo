import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';
import { TodoItem } from '../TodoItem/TodoItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, sortTodosByAlpabet } from '../../store/todoReducer';
import { startLoadingActionCreator, stopLoadingActionCreator } from '../../store/loaderReducer';

export const Todolist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todos } = useSelector(state => state.todos);
  const { isLoading } = useSelector(state => state.loader);
  useEffect(() => {
    if (localStorage.getItem('isSorted') === 'true') {
      dispatch(sortTodosByAlpabet());
    } else {
      dispatch(getTodos());
    }
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-wrap gap-4">
      {todos.map((todoItem, index) => (
        <TodoItem
          key={todoItem.id}
          todoItem={todoItem}
          onClick={() => {
            navigate(`todos/${todoItem.id}`);
          }}
        />
      ))}
    </div>
  );
};
