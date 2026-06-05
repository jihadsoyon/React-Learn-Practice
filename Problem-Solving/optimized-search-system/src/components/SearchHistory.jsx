function SearchHistory({ history, onSelect }) {
  return (
    <div className="history">
      <h3>Recent Searches</h3>

      {history.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(item)}
          className="history-btn"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default SearchHistory;