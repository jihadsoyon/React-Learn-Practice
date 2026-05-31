import { useState } from "react";
import initialMessages from "../data/initialMessages";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatContainer;