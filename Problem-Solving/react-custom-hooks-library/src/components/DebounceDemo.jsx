import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function DebounceDemo() {
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce(search);

  return (
    <div className="card">
      <h2>useDebounce</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p className="result">
        Debounced: {debouncedValue}
      </p>
    </div>
  );
}