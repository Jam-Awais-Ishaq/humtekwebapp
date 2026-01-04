import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import ReactDOM from "react-dom";
const ICONS = {
  success: <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />,
  error: <FaTimesCircle className="text-red-500 text-6xl" />,
  info: <FaInfoCircle className="text-blue-500 text-6xl" />,
  warning: <FaExclamationTriangle className="text-yellow-500 text-6xl" />,
};

const GenericStatusModal = ({
  open,
  type = "success",
  title,
  message,
  primaryButtonText = "OK",
  onPrimaryAction,
}) => {
  if (!open) return null;

  return  ReactDOM.createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center
                      animate-scaleIn shadow-xl">

        {/* ICON */}
        <div className="flex justify-center">
          {ICONS[type]}
        </div>

        {/* TEXT */}
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {title}
        </h2>

        <p className="text-gray-500 mt-2">
          {message}
        </p>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onPrimaryAction}
            className="px-5 py-2 w-full bg-blue-600 text-white cursor-pointer rounded-lg
                       hover:bg-blue-700 transition font-semibold"
          >
            {primaryButtonText}
          </button>

          
        </div>
      </div>
    </div>,
    document.body
  );
};
export default GenericStatusModal;