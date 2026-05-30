import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function OutsideClickDemo() {
  const [open, setOpen] = useState(true);

  const ref = useRef();

  useOutsideClick(ref, () => setOpen(false));

  return (
    <div className="card">
      <h2>useOutsideClick</h2>

      {open ? (
        <div
          ref={ref}
          className="outside-box"
        >
          Click outside me
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
        >
          Open Again
        </button>
      )}
    </div>
  );
}