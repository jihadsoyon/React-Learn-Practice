import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export function Tabs({
  children,
  defaultTab = 0,
}) {
  const [activeTab, setActiveTab] =
    useState(defaultTab);

  return (
    <TabsContext.Provider
      value={{ activeTab, setActiveTab }}
    >
      {children}
    </TabsContext.Provider>
  );
}

export function TabList({ children }) {
  return (
    <div className="tab-list">
      {children}
    </div>
  );
}

export function Tab({
  children,
  index,
}) {
  const { activeTab, setActiveTab } =
    useContext(TabsContext);

  return (
    <button
      className={
        activeTab === index
          ? "tab active-tab"
          : "tab"
      }
      onClick={() =>
        setActiveTab(index)
      }
    >
      {children}
    </button>
  );
}

export function TabPanel({
  children,
  index,
}) {
  const { activeTab } =
    useContext(TabsContext);

  if (activeTab !== index) return null;

  return (
    <div className="tab-panel">
      {children}
    </div>
  );
}