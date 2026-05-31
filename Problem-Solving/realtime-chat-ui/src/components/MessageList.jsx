const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${
            message.sender === "You" ? "user-message" : "bot-message"
          }`}
        >
          <p>{message.text}</p>
          <span>{message.time}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;