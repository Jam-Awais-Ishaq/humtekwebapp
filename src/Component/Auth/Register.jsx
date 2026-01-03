import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ntn, setNtn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};

    // Name validation
    if (!name) tempErrors.name = "Name is required";

    // Email validation
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Invalid email";

    // NTN validation (FBR format: 7 digits - 1 digit)
    const ntnRegex = /^[0-9]{7}-[0-9]$/;
    if (!ntn) tempErrors.ntn = "Company NTN is required";
    else if (!ntnRegex.test(ntn)) tempErrors.ntn = "Invalid NTN format (e.g., 1234567-1)";

    // Password validation
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    // Confirm password
    if (!confirmPassword) tempErrors.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log({ name, email, ntn, password });
      // Call backend API here
    }
  };

  return (
    <div className="w-full max-w-md mx-auto md:p-3 flex flex-col ">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>

      <form onSubmit={handleSubmit} className="flex flex-col ">

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`p-1 border-0 border-b-2 focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}/>
          {errors.name && <span className="text-red-500 text-[10px]">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col mt-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-1 border border-b-2 focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.email && <span className="text-red-500 text-[10px]">{errors.email}</span>}
        </div>

        {/* Company NTN */} 
        <div className="flex flex-col mt-5">
          <input
            type="text"
            placeholder="Company NTN (e.g., 1234567-1)"
            value={ntn}
            onChange={(e) => setNtn(e.target.value)}
            className={`p-1 border border-b-2 focus:outline-none focus:ring-2 ${
              errors.ntn ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.ntn && <span className="text-red-500 text-[10px]">{errors.ntn}</span>}
        </div>

        {/* Password */}
        <div className="relative flex flex-col mt-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-1 border border-b-2 w-full pr-10 focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
          {errors.password && <span className="text-red-500 text-[10px]">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="relative flex flex-col mt-5">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`p-1 border border-b-2 w-full pr-10 focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
          {errors.confirmPassword && <span className="text-red-500 text-[10px]">{errors.confirmPassword}</span>}
        </div>
        <button
          type="submit"
          className="py-2 rounded text-white font-semibold bg-linear-to-r from-purple-500 via-pink-500 to-red-500 mt-3
                     hover:from-red-500 hover:via-purple-500 hover:to-pink-500 transition-colors duration-700"
        >
          Register
        </button>
      </form>

      {/* Already have account */}
      <p className="text-sm text-center text-gray-500 mt-1">
        Already have an account?{" "}
        <button onClick={switchToLogin} className="text-blue-500 cursor-pointer hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;