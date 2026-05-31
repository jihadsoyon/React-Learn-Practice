import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="message-input-container">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSubmit}>
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;