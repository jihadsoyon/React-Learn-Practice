const FilterBar = ({ status, setStatus }) => {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="filter-select"
    >
      <option value="All">All</option>
      <option value="Todo">Todo</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

export default FilterBar;