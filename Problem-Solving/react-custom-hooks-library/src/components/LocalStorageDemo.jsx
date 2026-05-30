import useLocalStorage from "../hooks/useLocalStorage";

export default function LocalStorageDemo() {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div>
      <h2>useLocalStorage</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <p>{name}</p>
    </div>
  );
}