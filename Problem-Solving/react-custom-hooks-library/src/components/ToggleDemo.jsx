import useToggle from "../hooks/useToggle";

export default function ToggleDemo() {
  const [isOpen, toggle] = useToggle();

  return (
    <div>
      <h2>useToggle</h2>

      <button onClick={toggle}>
        {isOpen ? "Hide" : "Show"}
      </button>

      {isOpen && <p>Hello React Hook!</p>}
    </div>
  );
}