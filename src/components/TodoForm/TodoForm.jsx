import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Field } from '../Field/Field';
import { Button } from '../Button/Button';
import { ButtonClass } from '../../App';
import { useDispatch } from 'react-redux';
import { createTodo, getTodos, searchTodos } from '../../store/todoReducer';
import { sortTodosByAlpabet } from '../../store/todoReducer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
const schema = yup.object({
  title: yup.string().required('Title is required'),
});
export const TodoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [queryItem, setQueryItem] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  const [isSorted, setIsSorted] = useState(JSON.parse(localStorage.getItem('isSorted')) ?? false);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceQuery(queryItem);
    }, 500);
    return () => {
      clearTimeout(handleDebounce);
    };
  }, [queryItem]);

  useEffect(() => {
    if (debounceQuery) {
      dispatch(searchTodos(debounceQuery));
    } else {
      dispatch(getTodos());
    }
  }, [debounceQuery]);
  const handleTodoAdd = data => {
    dispatch(
      createTodo({
        title: data.title,
        completed: false,
        lowerTitle: data.title?.toLowerCase(),
      }),
    );
    setValue('title', '');
  };

  const onSort = () => {
    setIsSorted(prev => {
      const newValue = !prev;
      localStorage.setItem('isSorted', newValue ? 'true' : 'false');
      if (newValue) {
        dispatch(sortTodosByAlpabet());
      } else {
        dispatch(getTodos());
      }
      return newValue;
    });
  };

  return (
    <div className="flex gap-3 my-2 items-center content-center flex-1">
      <form
        action="#"
        className="flex gap-3 my-2 items-center flex-1"
        onSubmit={handleSubmit(handleTodoAdd)}
      >
        <Field
          className={clsx('flex-1 border-2 outline-1 rounded-lg w-1/4 p-2', {
            'border-red-500': errors.title?.message,
          })}
          type="text"
          name="title"
          placeholder="Enter todo title"
          {...register('title')}
        />
        <p className="text-red-500 text-l font-thin">{errors.title?.message}</p>
        <Button
          type="submit"
          className={ButtonClass + ` hover:!text-green-500 text-white px-3 p-2 rounded-lg`}
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
        {isSorted ? 'unsort' : 'sort'}
      </Button>
    </div>
  );
};
