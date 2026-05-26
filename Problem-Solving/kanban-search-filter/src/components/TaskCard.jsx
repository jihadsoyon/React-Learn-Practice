const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.status}</p>
    </div>
  );
};

export default TaskCard;