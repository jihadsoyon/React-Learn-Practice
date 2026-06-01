const DateFilter = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="all">All Months</option>
      <option value="3">Last 3 Months</option>
      <option value="6">Last 6 Months</option>
    </select>
  );
};

export default DateFilter;