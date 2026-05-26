import { useState } from "react";
import useCounterHistory from "../hooks/useCounterHistory";

export default function Counter() {
  const [step, setStep] = useState(1);
  const { value, increment, decrement, undo } = useCounterHistory(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Smart Counter</h1>
      <h2>{value}</h2>

      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={() => increment(step)}>+{step}</button>
      <button onClick={() => decrement(step)}>-{step}</button>
      <button onClick={undo}>Undo</button>
    </div>
  );
}