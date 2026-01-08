import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Context } from "../../Context/ContextProvider";

const Register = ({ switchToLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    ntn: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const {showStatusModal} = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();

    // REQUIRED FIELDS VALIDATION
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.ntn.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      showStatusModal({
        type: "warning",
        title: "Missing Information",
        message: "Please fill the data before submitting",
        primaryButtonText: "OK"
      });
      return;
    }

    // EMAIL VALIDATION
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      showStatusModal({
        type: "error",
        title: "Invalid Email",
        message: "Please enter a valid email address.",
        primaryButtonText: "OK"
      });
      return;
    }

    // NTN VALIDATION
    const ntnRegex = /^[0-9]{7}-[0-9]$/;
    if (!ntnRegex.test(form.ntn)) {
      showStatusModal({
        type: "error",
        title: "Invalid NTN",
        message: "NTN format should be like 1234567-1",
        primaryButtonText: "OK"
      });
      return;
    }

    // PASSWORD LENGTH
    if (form.password.length < 8) {
      showStatusModal({
        type: "error",
        title: "Weak Password",
        message: "Password must be at least 8 characters long.",
        primaryButtonText: "OK"
      });
      return;
    }

    // CONFIRM PASSWORD
    if (form.password !== form.confirmPassword) {
      showStatusModal({
        type: "error",
        title: "Password Mismatch",
        message: "Passwords do not match.",
        primaryButtonText: "OK"
      });
      return;
    }

    // SUCCESS CASE
    showStatusModal({
      type: "success",
      title: "Registration Successful!",
      message: "Your account has been created. Please login to continue.",
      primaryButtonText: "OK",
      onPrimaryAction: () => {
        // OPTIONAL - navigate to login screen
        switchToLogin();
      }
    });

    // RESET FORM
    setForm({
      name: "",
      email: "",
      ntn: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* NTN */}
          <input
            type="text"
            name="ntn"
            placeholder="Company NTN (e.g., 1234567-1)"
            value={form.ntn}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            className="py-3 rounded text-white font-semibold bg-linear-to-r from-purple-500 via-pink-500 to-red-500
                       hover:from-red-500 hover:via-purple-500 hover:to-pink-500 transition-colors duration-700"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;