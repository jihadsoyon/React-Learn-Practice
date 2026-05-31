import { useEffect, useRef, useState } from "react";
import initialMessages from "../data/initialMessages";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";

const botReplies = [
  "Interesting! Tell me more.",
  "I understand.",
  "That sounds great 🚀",
  "Can you explain further?",
  "Thanks for sharing that.",
];

const ChatContainer = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  const sendMessage = (text) => {
    const userMessage = {
      id: Date.now(),
      sender: "You",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    setTimeout(() => {
      const randomReply =
        botReplies[Math.floor(Math.random() * botReplies.length)];

      const botMessage = {
        id: Date.now() + 1,
        sender: "Bot",
        text: randomReply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="chat-container">
      <ChatHeader />

      <MessageList messages={messages} />

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef}></div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatContainer;