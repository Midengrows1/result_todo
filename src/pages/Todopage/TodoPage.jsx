import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { Field } from '../../components/Field/Field';
import { ButtonClass } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodo, updateTodo } from '../../store/todoReducer';

export const TodoPage = () => {
  const { id } = useParams();
  const { currentTodo } = useSelector(state => state.todos);
  const { isLoading } = useSelector(state => state.loader);
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodo(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentTodo) {
      setNewTitle(currentTodo.title ?? '');
      setIsCompleted(currentTodo.completed ?? false);
    }
  }, [currentTodo]);

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditStart = () => {
    setIsEditing(true);
    setNewTitle(currentTodo.title ?? '');
  };
  const handleEditSave = () => {
    const updatedTodo = { ...currentTodo, title: newTitle, lowerTitle: newTitle.toLowerCase() };
    dispatch(updateTodo(updatedTodo)).then(response => {
      if (response.status === 200) {
        setIsEditing(false);
      }
    });
  };

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    dispatch(updateTodo({ ...currentTodo, completed: !currentTodo.completed }));
  };
  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
    navigate(-1);
  };

  if (!currentTodo) {
    return <Navigate to="*" />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-amber-500">
      <div>
        <button
          className="border-2 m-2 px-2 py-1 rounded-lg font-bold transition-all duration-100 ease-in-out active:scale-95 cursor-pointer"
          onClick={() => navigate(-1, { replace: true })}
        >
          Back
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="border-2 overflow-hidden py-3 px-2 rounded-lg  min-w-[400px]  w-2/4 m-auto my-96  box-border">
            <h2 className="text-xl font-bold">Info:</h2>
            <div className="flex justify-between items-center">
              {isEditing ? (
                <Field
                  ref={inputRef}
                  type="text"
                  value={newTitle || ''}
                  onChange={e => setNewTitle(e.target.value)}
                  onBlur={handleEditSave}
                  className={'flex flex-1 px-2 py-2'}
                  onKeyDown={e => e.key === 'Enter' && handleEditSave()}
                />
              ) : (
                <div className="flex overflow-hidden gap-2 items-center">
                  <Field type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
                  <span
                    className={`overflow-ellipsis w-fit  overflow-hidden whitespace-nowrap font-bold ${
                      isCompleted ? 'line-through' : ''
                    }`}
                  >
                    {currentTodo.title}
                  </span>
                </div>
              )}
              <div className="flex gap-3 mx-2">
                {!isEditing && (
                  <button
                    type="button"
                    className={ButtonClass + ` hover:!text-blue-500 text-white p-2 px-3 rounded-lg`}
                    onClick={handleEditStart}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                )}

                <button
                  type="button"
                  className={ButtonClass + ` hover:!text-red-500 text-white p-2 px-3 rounded-lg`}
                  onClick={() => handleDeleteTodo(currentTodo.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
