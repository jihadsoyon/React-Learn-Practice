import {
  useEffect,
  useState,
  useCallback,
} from "react";

import Widget from "./Widget";
import initialWidgets from "../data/initialWidgets";

const Dashboard = () => {
  const [widgets, setWidgets] = useState(() => {
    const savedLayout =
      localStorage.getItem(
        "dashboard-layout"
      );

    return savedLayout
      ? JSON.parse(savedLayout)
      : initialWidgets;
  });

  useEffect(() => {
    localStorage.setItem(
      "dashboard-layout",
      JSON.stringify(widgets)
    );
  }, [widgets]);

  const updateWidget = useCallback(
    (id, updates) => {
      setWidgets((prevWidgets) =>
        prevWidgets.map((widget) =>
          widget.id === id
            ? {
                ...widget,
                ...updates,
              }
            : widget
        )
      );
    },
    []
  );

  const handleDragStop = useCallback(
    (id, d) => {
      updateWidget(id, {
        x: d.x,
        y: d.y,
      });
    },
    [updateWidget]
  );

  const handleResizeStop =
    useCallback(
      (id, ref, position) => {
        updateWidget(id, {
          width: parseInt(
            ref.style.width
          ),
          height: parseInt(
            ref.style.height
          ),
          x: position.x,
          y: position.y,
        });
      },
      [updateWidget]
    );

  return (
    <div className="dashboard">
      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          widget={widget}
          onDragStop={handleDragStop}
          onResizeStop={
            handleResizeStop
          }
        />
      ))}
    </div>
  );
};

export default Dashboard;