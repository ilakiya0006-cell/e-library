import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =
        await API.post(
          "/auth/login",
          formData
        );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login Successful");

      // GO TO HOME PAGE
      navigate("/home");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-blue-700">
            Login
          </h1>

          <p className="text-gray-500 mt-3">
            Welcome back to
            E-Library
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 p-4 rounded-xl mb-5 outline-none focus:border-blue-600"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border border-gray-300 p-4 rounded-xl mb-6 outline-none focus:border-blue-600"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* BUTTON */}
          <button className="bg-blue-700 hover:bg-blue-800 transition duration-300 text-white w-full p-4 rounded-xl text-lg font-bold shadow-lg">
            Login
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-700 font-bold ml-2 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;