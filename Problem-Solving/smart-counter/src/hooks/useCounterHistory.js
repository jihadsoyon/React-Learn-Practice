import { useState } from "react";

export default function useCounterHistory(initial = 0) {
  const [history, setHistory] = useState([initial]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentValue = history[currentIndex];

  const update = (newValue) => {
    if (newValue < 0) return;

    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newValue);

    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const increment = (step) => {
    update(currentValue + step);
  };

  const decrement = (step) => {
    update(currentValue - step);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return {
    value: currentValue,
    increment,
    decrement,
    undo,
  };
}