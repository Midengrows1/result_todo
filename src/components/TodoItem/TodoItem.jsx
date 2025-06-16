export const TodoItem = ({ todoItem, onClick }) => {
  return (
    <div
      className="border-2 py-3 px-2 rounded-lg min-w-[400px] flex-1 box-border cursor-pointer shadow-2xl"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <span
          className={`overflow-ellipsis w-fit overflow-hidden whitespace-nowrap font-bold ${
            todoItem.completed ? 'line-through' : ''
          }`}
        >
          {todoItem.title}
        </span>
      </div>
    </div>
  );
};
