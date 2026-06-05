import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import SearchHistory from "./components/SearchHistory";
import products from "./data/products";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history")) || [];
  });

  const debouncedTerm = useDebounce(searchTerm, 500);

  const filteredResults = useMemo(() => {
    return products.filter((item) =>
      item.name.toLowerCase().includes(
        debouncedTerm.toLowerCase()
      )
    );
  }, [debouncedTerm]);

  useEffect(() => {
    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );
  }, [history]);

  const saveSearch = () => {
    if (!searchTerm.trim()) return;

    const updatedHistory = [
      searchTerm,
      ...history.filter(
        (item) => item !== searchTerm
      )
    ].slice(0, 5);

    setHistory(updatedHistory);
  };

  return (
    <div className="container">
      <h1>Optimized Search System</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <button
        className="search-btn"
        onClick={saveSearch}
      >
        Save Search
      </button>

      <SearchHistory
        history={history}
        onSelect={setSearchTerm}
      />

      <SearchResults
        results={filteredResults}
        query={debouncedTerm}
      />
    </div>
  );
}

export default App;