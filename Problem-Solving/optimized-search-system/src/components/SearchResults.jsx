function SearchResults({ results, query }) {
  const highlightText = (text) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="results">
      {results.map((item) => (
        <div key={item.id} className="card">
          {highlightText(item.name)}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;