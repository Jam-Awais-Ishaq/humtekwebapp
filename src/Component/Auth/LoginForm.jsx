import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ switchToRegister, isOpen, setOpenModal }) => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    } else {
      alert("Login successful!");
      navigate('/dashboard')
    }

    console.log("Email:", form.email);
    console.log("Password:", form.password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-2 h-full">
      <div className="flex flex-col md:flex-row rounded-lg overflow-hidden h-full">

        {/* Left Form Section */}
        <div className="w-full bg-white flex flex-col justify-center gap-3">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to HUMTEK</h2>
          <p className="text-gray-500">Sign in to your account</p>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>
              <a href="#" onClick={() => setOpenModal(true)} className="text-blue-500 hover:underline">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="py-3 rounded text-white font-semibold bg-linear-to-r from-purple-500 via-pink-500 to-red-500
                         hover:bg-linear-to-r hover:from-red-500 hover:via-purple-500 hover:to-pink-500
                         transition-colors duration-700 cursor-pointer ">
              Login
            </button>
          </form>

          {/* Don't have an account */}
          <p className="text-sm text-center text-gray-500 mt-1 rounded">
            Don't have an account? <button
              onClick={switchToRegister}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
