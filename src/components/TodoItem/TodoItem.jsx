import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ButtonClass } from '../../App';
import { useEffect, useRef, useState } from 'react';
import { Field } from '../Field/Field';

export const TodoItem = ({
  id,
  todoTitle,
  onUpdate,
  onDelete,
  setCurrentTodo,
  singleTodo,
  completed,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todoTitle);
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  const editTodo = () => {
    onUpdate(id, newTitle, completed);
    setIsEditing(false);
  };
  return (
    <div key={id} className="border-2 py-3 px-2 rounded-lg  min-w-[400px]  flex-1 box-border">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <Field
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={editTodo}
            className={'flex flex-1 px-2 py-2'}
            onKeyDown={e => e.key === 'Enter' && editTodo()}
            ref={inputRef}
          />
        ) : (
          <div className="flex gap-2 items-center">
            <Field
              type="checkbox"
              checked={completed}
              onChange={() => onUpdate(id, newTitle, !completed)}
            />
            <span
              className={`overflow-ellipsis w-fit overflow-hidden whitespace-nowrap ${
                completed ? 'line-through' : ''
              }`}
            >
              {todoTitle}
            </span>
          </div>
        )}
        <div className="flex gap-3 mx-2">
          <button
            type="button"
            className={ButtonClass + ` hover:!text-blue-500 text-white p-2 px-3 rounded-lg`}
            onClick={() => setIsEditing(true)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>

          <button
            type="button"
            className={ButtonClass + ` hover:!text-red-500 text-white p-2 px-3 rounded-lg`}
            onClick={() => onDelete(id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
};
