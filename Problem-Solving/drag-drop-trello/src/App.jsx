import Board from "./components/Board";

function App() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#fff"
        }}
      >
        🚀 Mini Trello Board
      </h1>

      <Board />
    </div>
  );
}

export default App;