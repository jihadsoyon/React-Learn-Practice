import Widget from "./Widget";
import initialWidgets from "../data/initialWidgets";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {initialWidgets.map((widget) => (
        <Widget
          key={widget.id}
          widget={widget}
        />
      ))}
    </div>
  );
};

export default Dashboard;