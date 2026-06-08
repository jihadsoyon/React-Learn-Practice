import { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

export function Accordion({ children }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <AccordionContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
      }}
    >
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

export function useAccordion() {
  return useContext(AccordionContext);
}