import { useState, useRef } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const inputRef = useRef();

  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim()); // message send
    setText("");         // input field empty
    inputRef.current.focus(); // focus wapas input me
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="p-3 border-t bg-white flex gap-2">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type message..."
        className="flex-1 border rounded-md px-3 py-2 text-sm outline-none"
      />
      <button
        onClick={send}
        className="bg-blue-600 text-white px-3 rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
