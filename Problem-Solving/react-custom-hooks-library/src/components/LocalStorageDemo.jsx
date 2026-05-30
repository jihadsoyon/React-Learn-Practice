import useLocalStorage from "../hooks/useLocalStorage";

export default function LocalStorageDemo() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div className="card">
      <h2>useLocalStorage</h2>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p className="result">{name}</p>
    </div>
  );
}