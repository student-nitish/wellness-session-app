
import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"



const Register = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
       toast.success("User registered succesfull");
       nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
   <div className="max-w-md mx-auto mt-16 p-8 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg">
  <h1 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">Create Account</h1>
  {error && (
    <div className="bg-red-50 text-red-700 px-4 py-2 rounded mb-4 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l6.518 11.59c.75 1.334-.213 2.996-1.723 2.996H3.462c-1.51 0-2.473-1.662-1.723-2.996l6.518-11.59zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-3a1 1 0 01.993.883L11 12v1a1 1 0 11-2 0v-1a1 1 0 01.883-.993L9 11z" clipRule="evenodd" />
      </svg>
      <span>{error}</span>
    </div>
  )}
  <form onSubmit={submit} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          placeholder="John"
          value={form.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          placeholder="Doe"
          value={form.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        id="email"
        name="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className=" relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
         type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          className=" w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
         <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[36px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
      </div>
      <div className=" relative">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
           type={showConfirmPassword? "text" : "password"}
          name="confirmPassword"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

         <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[36px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
      </div>
    </div>

    <button
      type="submit"
      className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-[1.01] transition"
    >
      Register
    </button>
  </form>
  <p className="text-center text-sm text-gray-500 mt-4">
    Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Log in</a>
  </p>
</div>

  );
};

export default Register;
