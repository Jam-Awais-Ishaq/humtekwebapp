import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/ContextProvider";

const ForgetPassword = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [ntn, setNtn] = useState("");
  const [errors, setErrors] = useState({});

  const { showStatusModal } = useContext(Context);
  const navigate = useNavigate();
  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ntnRegex = /^[0-9]{7}-[0-9]{1}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // REQUIRED FIELDS CHECK
    if (!email.trim() || !ntn.trim()) {
      showStatusModal({
        type: "warning",
        title: "Missing Information",
        message: "Please fill out all required fields before submitting.",
        primaryButtonText: "OK"
      });
      return;
    }

    // EMAIL VALIDATION
    if (!emailRegex.test(email)) {
      showStatusModal({
        type: "error",
        title: "Invalid Email",
        message: "Please enter a valid email address.",
        primaryButtonText: "OK"
      });
      return;
    }

    // NTN VALIDATION
    if (!ntnRegex.test(ntn)) {
      showStatusModal({
        type: "error",
        title: "Invalid NTN",
        message: "NTN format must be like 1234567-8.",
        primaryButtonText: "OK"
      });
      return;
    }

    // SUCCESS — If modal close then call onSuccess
    showStatusModal({
      type: "success",
      title: "Verification Passed!",
      message: "Email & NTN looks good.",
      primaryButtonText: "Continue",
      onPrimaryAction: () => {
        const data = { email, ntn };
        // reset form
        setEmail("");
        setNtn("");

        if (onSuccess) onSuccess(data);
      }
    });
  };



  return (
    <div className=" flex justify-center from-blue-50 via-white to-blue-100 px-4 sm:px-3 lg:px-7">
      <div className="w-full max-w-md sm:max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-3 sm:p-6"
        >
          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800">
              Forgot Password
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Verify your account using Email & NTN
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition
                ${errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* NTN */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company NTN Number
            </label>
            <input
              type="text"
              placeholder="1234567-8"
              value={ntn}
              onChange={(e) => setNtn(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition
                ${errors.ntn
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
            />
            {errors.ntn && (
              <p className="text-red-500 text-xs mt-1">{errors.ntn}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="py-3 rounded text-white font-semibold bg-linear-to-r from-purple-500 via-pink-500 to-red-500
                         hover:bg-linear-to-r hover:from-red-500 hover:via-purple-500 hover:to-pink-500
                         transition-colors duration-700 w-full cursor-pointer">
            Verify & Continue
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            © DigiInvoice • Secure Account Verification
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;