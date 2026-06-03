import { useEffect, useState } from "react";
import Widget from "./Widget";
import initialWidgets from "../data/initialWidgets";

const Dashboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const savedLayout = localStorage.getItem("dashboard-layout");

    if (savedLayout) {
      return JSON.parse(savedLayout);
    }

    return initialWidgets;
  });

  useEffect(() => {
    localStorage.setItem(
      "dashboard-layout",
      JSON.stringify(widgets)
    );
  }, [widgets]);

  return (
    <div className="dashboard">
      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          widget={widget}
          widgets={widgets}
          setWidgets={setWidgets}
        />
      ))}
    </div>
  );
};

export default Dashboard;