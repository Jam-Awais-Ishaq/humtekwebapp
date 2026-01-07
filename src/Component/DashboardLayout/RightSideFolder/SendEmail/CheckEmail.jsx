import { useState } from "react";
import IncomingEmail from "./IncomingEmail";
import SendResponseToEmail from "./SendResponseToEmail";

const CheckEmail = () => {
  const [emails] = useState([
    { id: 1, from: "john@example.com", subject: "Hello!", body: "How are you?", replies: [] },
    { id: 2, from: "alice@example.com", subject: "Meeting", body: "Let's meet tomorrow.", replies: [] },
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showReply, setShowReply] = useState(false);

  const openEmail = (email) => {
    setSelectedEmail(email);
    setShowReply(false);
  };

  const openReplyBox = () => setShowReply(true);

  const sendReply = ({ message, attachments }) => {
    if (!selectedEmail) return;

    selectedEmail.replies.push({
      message,
      attachments,
      timestamp: new Date(),
      open: true,
    });

    setSelectedEmail({ ...selectedEmail });
    setShowReply(false);
  };

  const toggleReply = (index) => {
    selectedEmail.replies[index].open = !selectedEmail.replies[index].open;
    setSelectedEmail({ ...selectedEmail });
  };

  return (
    <div className="flex gap-4 p-4 h-[90vh]">
      {/* Inbox */}
      <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm overflow-y-auto hover:shadow-md transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-center py-3 border-b bg-gray-50 tracking-wide">Inbox</h2>
        {emails.map((email) => (
          <IncomingEmail
            key={email.id}
            email={email}
            onClick={() => openEmail(email)}
            isSelected={selectedEmail?.id === email.id}
          />
        ))}
      </div>

      {/* Email Panel */}
      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col p-4 hover:shadow-md transition-shadow duration-200">
        {selectedEmail ? (
          <>
            {/* Email Body */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold">{selectedEmail.subject}</h3>
              <p className="text-sm text-gray-500">From: {selectedEmail.from}</p>
            </div>

            <div className="flex-1 overflow-y-auto mb-2 p-2 border border-gray-100 rounded">
              <p className="whitespace-pre-wrap text-gray-700">{selectedEmail.body}</p>

              {/* Replies Container */}
              {selectedEmail.replies.length > 0 && (
                <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                  {selectedEmail.replies.map((rep, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded shadow-sm overflow-hidden transition-all duration-300"
                    >
                      {/* Collapse Header */}
                      <div
                        onClick={() => toggleReply(idx)}
                        className="flex justify-between items-center bg-gray-100 px-3 py-2 cursor-pointer hover:bg-gray-200 transition"
                      >
                        <span className="font-medium text-gray-800 truncate">
                          Reply - {rep.timestamp.toLocaleString()}
                        </span>
                        <span className="text-gray-500">{rep.open ? "▼" : "▶"}</span>
                      </div>

                      {/* Reply Content */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${rep.open ? "max-h-96 p-3" : "max-h-0 p-0"}`}
                      >
                        <p className="whitespace-pre-wrap text-gray-800">{rep.message}</p>
                        {rep.attachments && rep.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {rep.attachments.map((file, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  const url = URL.createObjectURL(file);
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = file.name;
                                  a.click();
                                }}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                              >
                                📎 {file.name} ⬇️
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reply Button Below */}
            {!showReply ? (
              <button
                onClick={openReplyBox}
                className="mt-2 self-end bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-700 active:scale-95"
              >
                Reply
              </button>
            ) : (
              <SendResponseToEmail
                recipient={selectedEmail.from}
                onSend={sendReply}
              />
            )}
          </>
        ) : (
          <div className="text-gray-400 text-center m-auto select-none">
            Select an email to view
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckEmail;
