import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useTodos } from '../../hooks/useTodos';
import { Field } from '../../components/Field/Field';
import { ButtonClass } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader/Loader';

export const TodoPage = () => {
  const { id } = useParams();
  const { getSingleTodo, handleUpdateTodo, handleDeleteTodo, isLoading } = useTodos();
  const [currentTodo, setCurrentTodo] = useState({});
  const [newTitle, setNewTitle] = useState(currentTodo?.title ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const getTodo = async () => {
    const todo = await getSingleTodo(id);
    setCurrentTodo(todo);
  };
  const editTodo = () => {
    const updatedTodo = { ...currentTodo, title: newTitle };
    handleUpdateTodo(updatedTodo);
    setIsEditing(false);
    getTodo();
  };
  useEffect(() => {
    getTodo();
    setNewTitle(currentTodo?.title);
  }, [id]);
  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
      setNewTitle(currentTodo.title);
    }
  }, [isEditing]);
  if (!currentTodo) {
    return <Navigate to="*" />;
  }
  if (isLoading && !id) return <Loader />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-amber-500">
      <div>
        <button
          className="border-2 m-2 px-2 py-1 rounded-lg font-bold transition-all duration-100 ease-in-out active:scale-95 cursor-pointer"
          onClick={() => navigate(-1, { replace: true })}
        >
          Back
        </button>
        <div className="border-2 overflow-hidden py-3 px-2 rounded-lg  min-w-[400px]  w-2/4 m-auto my-96  box-border">
          <h2 className="text-xl font-bold">Info:</h2>
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Field
                type="text"
                value={newTitle || ''}
                onChange={e => setNewTitle(e.target.value)}
                onBlur={editTodo}
                className={'flex flex-1 px-2 py-2'}
                onKeyDown={e => e.key === 'Enter' && editTodo()}
                ref={inputRef}
              />
            ) : (
              <div className="flex overflow-hidden gap-2 items-center">
                <Field
                  type="checkbox"
                  checked={currentTodo.completed}
                  onChange={() => {
                    handleUpdateTodo({ ...currentTodo, completed: !currentTodo.completed });
                    getTodo();
                  }}
                />
                <span
                  className={`overflow-ellipsis w-fit  overflow-hidden whitespace-nowrap font-bold ${
                    currentTodo.completed ? 'line-through' : ''
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
                  onClick={() => setIsEditing(true)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              )}

              <button
                type="button"
                className={ButtonClass + ` hover:!text-red-500 text-white p-2 px-3 rounded-lg`}
                onClick={() => {
                  handleDeleteTodo(currentTodo.id);
                  navigate(-1);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
