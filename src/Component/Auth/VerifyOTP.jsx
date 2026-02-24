import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/ContextProvider";
import { verifyOtp, resendOtp } from "../../api/AuthApi";

const VerifyOTP = ({ onSuccess }) => {

  const [form, setForm] = useState({
    email: "",
    otp: "",
    error: "",
    timeLeft: 60,
  });

  const { showStatusModal } = useContext(Context)

  // ================= TIMER CODE =================
  useEffect(() => {
    if (form.timeLeft <= 0) return;

    const timer = setInterval(() => {
      setForm(prev => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [form.timeLeft]);
  // =============================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      error: "",
    }));
  };

  // ================= VERIFY BUTTON =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.otp.trim()) {
      showStatusModal({
        type: "warning",
        title: "Missing Data",
        message: "Email and OTP are required",
        primaryButtonText: "OK",
      });
      return;
    }

    if (!/^[0-9]{6}$/.test(form.otp)) {
      showStatusModal({
        type: "error",
        title: "Invalid OTP",
        message: "OTP must be exactly 6 digits",
        primaryButtonText: "OK",
      });
      return;
    }

    try {
      const res = await verifyOtp({
        email: form.email,
        otp: form.otp,
      });

      showStatusModal({
        type: "success",
        title: "OTP Verified",
        message: res.message,
        primaryButtonText: "Continue",
        onPrimaryAction: () => {
          setForm(prev => ({ ...prev, otp: "" }));
          if (onSuccess) onSuccess();
        },
      });
    } catch (err) {
      showStatusModal({
        type: "error",
        title: "Verification Failed",
        message: err.response?.data?.message || "Invalid or expired OTP",
        primaryButtonText: "OK",
      });
    }
  };

  // ================= RESEND OTP =================
  const handleResend = async () => {
    if (!form.email.trim()) {
      showStatusModal({
        type: "warning",
        title: "Email Required",
        message: "Please enter your email first",
        primaryButtonText: "OK",
      });
      return;
    }

    try {
      const res = await resendOtp({
        email: form.email,
      });

      showStatusModal({
        type: "success",
        title: "OTP Resent",
        message: res.message || "A new OTP has been sent to your email",
        primaryButtonText: "OK",
      });

      // 🔁 reset timer & otp field
      setForm(prev => ({
        ...prev,
        otp: "",
        timeLeft: 60,
      }));

    } catch (err) {
      showStatusModal({
        type: "error",
        title: "Resend Failed",
        message: err.response?.data?.message || "Please wait before resending OTP",
        primaryButtonText: "OK",
      });
    }
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

            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" className="w-full px-4 py-3 border rounded-lg mb-3" />
            <input
              type="text"
              name="otp"
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
            disabled={form.timeLeft > 0}
            className={`mt-3 w-full py-2 font-semibold border rounded-lg transition cursor-pointer
    ${form.timeLeft > 0
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
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