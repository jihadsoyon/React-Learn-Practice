import { FaCircle } from "react-icons/fa";

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div>
        <h2>Support Chat</h2>
        <p>
          <FaCircle className="online-dot" />
          Online
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;