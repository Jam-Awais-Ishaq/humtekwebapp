import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = ({ onSuccessModel }) => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    error: "",
    showPassword: false,
    showConfirm: false,
    loading: false,
    strength: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const togglePassword = (field) => {
    setForm((prev) => ({
      ...prev,
      [field === "password" ? "showPassword" : "showConfirm"]:
        !prev[field === "password" ? "showPassword" : "showConfirm"],
    }));
  };

  const checkStrength = (pwd) => {
    if (pwd.length >= 12) return "Strong";
    if (pwd.length >= 8) return "Medium";
    if (pwd.length > 0) return "Weak";
    return "";
  };

  // ✅ Strength UI Helper
  const getStrengthUI = () => {
    switch (form.strength) {
      case "Weak":
        return {
          color: "text-red-500",
          bg: "bg-red-500",
          width: "w-1/3",
          emoji: "😟",
        };
      case "Medium":
        return {
          color: "text-yellow-500",
          bg: "bg-yellow-400",
          width: "w-2/3",
          emoji: "😐",
        };
      case "Strong":
        return {
          color: "text-green-600",
          bg: "bg-green-500",
          width: "w-full",
          emoji: "💪",
        };
      default:
        return {};
    }
  };

  const strengthUI = getStrengthUI();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      error: "",
      strength: name === "password" ? checkStrength(value) : prev.strength,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      setForm((p) => ({ ...p, error: "All fields are required" }));
      return;
    }

    if (form.password.length < 8) {
      setForm((p) => ({
        ...p,
        error: "Password must be at least 8 characters",
      }));
      return;
    }

    if (form.password !== form.confirmPassword) {
      setForm((p) => ({ ...p, error: "Passwords do not match" }));
      return;
    }

    setForm((p) => ({ ...p, loading: true }));

    setTimeout(() => {
      setForm((p) => ({ ...p, loading: false }));
      setShowSuccessModal(true);

      setTimeout(() => setShowSuccessModal(false), 3000);
      setTimeout(() => onSuccessModel(), 4000);
    }, 1500);
  };

  return (
    <>
      <div className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md sm:max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                Reset Password
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Create a strong new password
              </p>
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type={form.showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="absolute right-3 top-11 cursor-pointer text-gray-500"
                onClick={() => togglePassword("password")}
              >
                {form.showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>

              {/* 🔥 Strength Text + Emoji */}
              {form.strength && (
                <p className={`text-md mt-2 font-semibold ${strengthUI.color}`}>
                  {strengthUI.emoji} {form.strength} password
                </p>
              )}

             
            </div>

            {/* Confirm */}
            <div className="mb-6 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type={form.showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span
                className="absolute right-3 top-11 cursor-pointer text-gray-500"
                onClick={() => togglePassword("confirm")}
              >
                {form.showConfirm ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>

            {form.error && (
              <p className="text-red-500 text-xs mb-4">{form.error}</p>
            )}

            <button
              type="submit"
              disabled={form.loading}
              className="py-3 rounded text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                         hover:bg-gradient-to-r hover:from-red-500 hover:via-purple-500 hover:to-pink-500
                         transition-colors duration-700 w-full cursor-pointer"
            >
              {form.loading ? "Resetting..." : "Reset Password"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">
              © DigiInvoice • Secure Password Reset
            </p>
          </form>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center animate-scale">
            <div className="text-green-500 text-6xl mb-3">✓</div>
            <h3 className="text-xl font-bold text-gray-800">
              Password Reset Successful
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;