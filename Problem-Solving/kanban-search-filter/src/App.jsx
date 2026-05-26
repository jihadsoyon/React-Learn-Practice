import { useState } from "react";
import tasksData from "./data/tasks";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredTasks = tasksData.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || task.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <h1>🚀 Kanban Search & Filter</h1>

      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />

        <FilterBar status={status} setStatus={setStatus} />
      </div>

      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default App;