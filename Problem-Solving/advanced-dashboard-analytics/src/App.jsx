import { useState } from "react";

import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import DateFilter from "./components/DateFilter";

import { analyticsData } from "./data/analyticsData";

function App() {
  const [filter, setFilter] = useState("all");

  const filteredData =
    filter === "all"
      ? analyticsData
      : analyticsData.slice(-Number(filter));

  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalUsers = filteredData.reduce(
    (sum, item) => sum + item.users,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <DateFilter
            value={filter}
            onChange={setFilter}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue}`}
          />

          <StatCard
            title="Total Users"
            value={totalUsers}
          />

          <StatCard
            title="Conversion Rate"
            value="18.5%"
          />
        </div>

        <RevenueChart data={filteredData} />
      </div>
    </div>
  );
}

export default App;