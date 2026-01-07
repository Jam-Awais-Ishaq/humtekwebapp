const IncomingEmail = ({ email, onClick, isSelected }) => {
    return (
        <div
            onClick={onClick}
            className={`px-3 py-3 cursor-pointer border-b last:border-b-0 transition-all duration-200
      ${isSelected ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-gray-100"}`}
        >
            <p className="font-medium text-sm">{email.subject}</p>
            <p className="text-xs text-gray-500 truncate">{email.from}</p>
        </div>
    );
};

export default IncomingEmail;