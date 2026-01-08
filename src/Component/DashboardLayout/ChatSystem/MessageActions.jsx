import { useState } from "react";

const MessageActions = ({ menu, onEdit, onDelete, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [updated, setUpdated] = useState(menu.text);

  return (
    <div
      className="fixed bg-white shadow-lg border rounded-md w-37.5 text-sm z-999"
      style={{ top: menu.y, left: menu.x }}
    >
      {!editMode ? (
        <>
          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>

          <button
            className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
            onClick={() => onDelete(menu.id)}
          >
            Delete
          </button>

          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="p-2 space-y-2">
          <input
            className="border rounded px-2 py-1 w-full"
            value={updated}
            onChange={(e) => setUpdated(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white rounded py-1"
            onClick={() => onEdit(menu.id, updated)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageActions;
