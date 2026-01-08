import { useState, useRef, useEffect } from "react";
import { ChevronDown, Edit2, Trash2, X } from "lucide-react";

const MessageList = ({ messages, }) => {
    const menuRef = useRef();
    const listEndRef = useRef();

    // Auto scroll
    useEffect(() => {
        listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(null);
                setEditMode(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-100 relative">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"} group relative`}
                >
                    <div
                        className={`px-3 py-2 rounded-lg max-w-[75%] relative ${msg.sender === "You"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-300 text-black rounded-bl-none"
                            }`}
                    >
                        {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1">{msg.time}</span>

                    {msg.audio && (
                        <audio controls className="mt-1 w-full">
                            <source src={msg.audio} type="audio/webm" />
                            Your browser does not support audio.
                        </audio>
                    )}
                </div>

            ))}




        </div>
    );
};

export default MessageList;
