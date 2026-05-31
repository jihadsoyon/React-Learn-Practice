import initialMessages from "../data/initialMessages";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";

const ChatContainer = () => {
  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageList messages={initialMessages} />
    </div>
  );
};

export default ChatContainer;