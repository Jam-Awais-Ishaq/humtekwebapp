import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/ContextProvider";

const VerifyOTP = ({ onSuccess }) => {

  const [form, setForm] = useState({
    otp: "",
    error: "",
    timeLeft: 60, // ⏱️ TIMER STATE
  });

  const {showStatusModal} = useContext(Context)

  // ================= TIMER CODE =================
  useEffect(() => {
    if (form.timeLeft === 0) return;

    const timer = setInterval(() => {
      setForm((prev) => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [form.timeLeft]);
  // =============================================

  const handleChange = (e) => {
    setForm({ ...form, otp: e.target.value, error: "" });
  };

  // ================= VERIFY BUTTON =================
  const handleSubmit = (e) => {
    e.preventDefault();

    // EMPTY OTP
    if (!form.otp.trim()) {
      showStatusModal({
        type: "warning",
        title: "OTP Required",
        message: "Please enter your OTP before verifying.",
        primaryButtonText: "OK"
      });
      return;
    }

    // WRONG FORMAT
    if (!/^[0-9]{6}$/.test(form.otp)) {
      showStatusModal({
        type: "error",
        title: "Invalid OTP",
        message: "OTP must be exactly 6 digits.",
        primaryButtonText: "OK"
      });
      return;
    }

    // CORRECT OTP
    showStatusModal({
      type: "success",
      title: "OTP Verified!",
      message: "Your OTP has been successfully verified.",
      primaryButtonText: "Continue",
      onPrimaryAction: () => {
        setForm((prev) => ({ ...prev, otp: "" }));

        if (onSuccess) onSuccess(); // wrapper callback
      }
    });
  };

  // ================================================

  // ================= RESEND OTP =================
  const handleResend = () => {
    // backend call here if needed

    showStatusModal({
      type: "info",
      title: "OTP Sent",
      message: "A new OTP has been sent to your email/phone.",
      primaryButtonText: "OK",
      onPrimaryAction: () => {
        setForm((prev) => ({
          ...prev,
          timeLeft: 60,
          otp: "",
        }));
      }
    });
  };

  // ===============================================

  return (
    <div className="flex items-center justify-center  px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg">
        <form
          className="bg-white rounded-2xlp-6 sm:p-7"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
              Verify OTP
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Enter the 6-digit OTP sent to your email
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              OTP Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={form.otp}
              onChange={handleChange}
              placeholder="******"
              className={`w-full text-center tracking-widest text-lg px-4 py-3 border rounded-lg focus:outline-none
                ${form.error
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
            />
            {form.error && (
              <p className="text-red-500 text-xs mt-1">{form.error}</p>
            )}
          </div>

          {/* ⏱️ TIMER DISPLAY */}
          <p className="text-center text-sm text-gray-500 mb-4">
            OTP expires in{" "}
            <span className="font-semibold">{form.timeLeft}s</span>
          </p>

          {/* VERIFY BUTTON */}
          <button
            type="submit"
            disabled={form.timeLeft === 0}
            className="py-3 rounded text-white font-semibold bg-linear-to-r from-purple-500 via-pink-500 to-red-500
                         hover:bg-linear-to-r hover:from-red-500 hover:via-purple-500 hover:to-pink-500
                         transition-colors duration-700 cursor-pointer w-full"
          >
            Verify OTP
          </button>

          {/* RESEND OTP BUTTON */}
          <button
            type="button"
            onClick={handleResend}
            className="mt-3 w-full py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg
              hover:bg-blue-50 transition cursor-pointer"
          >
            Resend OTP
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            © DigiInvoice • OTP Verification
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
