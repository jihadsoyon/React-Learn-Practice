import { useState } from "react";

const CharacterCounter = () => {
  const [text, setText] = useState("");

  const maxLength = 100;

  const percentage = (text.length / maxLength) * 100;

  return (
    <div className="counter-container">
      <h1 className="counter-title">
        ✍ Real-Time Character Counter
      </h1>

      <textarea
        className="textarea"
        placeholder="Start typing here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="counter-info">
        <p>
          {text.length}/{maxLength}
        </p>

        {text.length > maxLength && (
          <p className="warning">
            Character limit exceeded!
          </p>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${percentage}%`,
            background: percentage > 100 ? "#ef4444" : "#22c55e"
          }}
        />
      </div>
    </div>
  );
};

export default CharacterCounter;