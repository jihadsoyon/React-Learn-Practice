import useToggle from "../hooks/useToggle";

export default function ToggleDemo() {
  const [isOpen, toggle] = useToggle();

  return (
    <div className="card">
      <h2>useToggle</h2>

      <button onClick={toggle}>
        {isOpen ? "Hide" : "Show"}
      </button>

      {isOpen && (
        <p className="result">
          Hello React Hook!
        </p>
      )}
    </div>
  );
}