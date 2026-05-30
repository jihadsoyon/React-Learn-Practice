import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function OutsideClickDemo() {
  const [open, setOpen] = useState(true);

  const ref = useRef();

  useOutsideClick(ref, () => setOpen(false));

  return (
    <div>
      <h2>useOutsideClick</h2>

      {open && (
        <div
          ref={ref}
          style={{
            border: "1px solid black",
            padding: "20px"
          }}
        >
          Click outside me
        </div>
      )}
    </div>
  );
}