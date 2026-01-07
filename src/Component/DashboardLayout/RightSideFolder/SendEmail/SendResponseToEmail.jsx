import { useState, useRef } from "react";

const SendResponseToEmail = ({ recipient, onSend }) => {
  const [reply, setReply] = useState("");
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSend = (e) => {
    e.preventDefault();
    if (!reply.trim() && attachments.length === 0) return;

    onSend({ message: reply, attachments });
    setReply("");
    setAttachments([]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex flex-col mt-2 gap-2"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder={`Reply to ${recipient}`}
        className="w-full h-24 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Attachments */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            📎 Attach File
          </button>
          <span className="text-gray-500 text-sm">Drag & drop files here</span>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {attachments.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200 transition"
              >
                📎 {file.name}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 font-bold"
                  onClick={() => removeAttachment(i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send Button */}
      <button
        type="submit"
        className="self-end bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Send
      </button>
    </form>
  );
};

export default SendResponseToEmail;