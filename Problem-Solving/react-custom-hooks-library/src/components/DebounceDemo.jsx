import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function DebounceDemo() {
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce(search);

  return (
    <div>
      <h2>useDebounce</h2>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <p>Debounced: {debouncedValue}</p>
    </div>
  );
}