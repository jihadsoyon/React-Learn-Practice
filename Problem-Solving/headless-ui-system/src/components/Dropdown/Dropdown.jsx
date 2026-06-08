import { createContext, useContext, useEffect, useRef, useState } from "react";

const DropdownContext = createContext();

export function Dropdown({ children }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen }}
    >
      <div ref={dropdownRef} className="dropdown">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownButton({ children }) {
  const { open, setOpen } = useContext(DropdownContext);

  return (
    <button
      className="dropdown-btn"
      onClick={() => setOpen(!open)}
    >
      {children}
    </button>
  );
}

export function DropdownMenu({ children }) {
  const { open } = useContext(DropdownContext);

  if (!open) return null;

  return (
    <div className="dropdown-menu">
      {children}
    </div>
  );
}