import { useState, useRef } from "react";
import { X } from "lucide-react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatSidePanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Admin",
      text: "Hello! How can I help you today?",
      time: "10:00 AM",
    },
    {
      id: "2",
      sender: "You",
      text: "Hi, I need help",
      time: "10:01 AM",
    },
  ]);

  const panelRef = useRef(); // ye important hai dropdown ke liye

  const addMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "You",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // const addVoiceMessage = (blob) => {
  //   const url = URL.createObjectURL(blob);
  //   setMessages(prev => [
  //     ...prev,
  //     {
  //       id: crypto.randomUUID(),
  //       sender: "You",
  //       text: "[Voice Message]",
  //       audio: url,
  //       time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  //     }
  //   ]);
  // };



  return (
    <div
      ref={panelRef}
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l z-50 transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-3 bg-blue-600 text-white font-semibold">
        <span>Chat with Admin</span>
        <button className="cursor-pointer" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* MESSAGE LIST */}
      <MessageList
        messages={messages}
        setMessages={setMessages}
        panelRef={panelRef}
      />

      {/* INPUT */}
      <MessageInput onSend={addMessage}
      // onSendVoice={(blob) => addVoiceMessage(blob)}
      />
    </div>
  );
};

export default ChatSidePanel;
