import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  // =====================================
  // FORM STATE
  // =====================================

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  // =====================================
  // HANDLE INPUT CHANGE
  // =====================================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================
  // HANDLE REGISTER
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ============================
      // API REGISTER
      // ============================

      const response =
        await API.post(
          "/auth/register",
          formData
        );

      // ============================
      // LOCAL STORAGE USERS
      // ============================

      const users =
        JSON.parse(
          localStorage.getItem(
            "users"
          )
        ) || [];

      // CHECK DUPLICATE EMAIL
      const existingUser =
        users.find(
          (user) =>
            user.email ===
            formData.email
        );

      if (existingUser) {
        alert(
          "User Already Registered"
        );

        return;
      }

      // ADD NEW USER
      users.push(formData);

      // SAVE USERS
      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      // SUCCESS MESSAGE
      alert(response.data.message);

      // CLEAR FORM
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // REDIRECT LOGIN
      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">
        {/* TITLE */}

        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-green-700">
            Register
          </h1>

          <p className="text-gray-500 mt-3">
            Create your E-Library
            account
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full border border-gray-300 p-4 rounded-xl mb-5 outline-none focus:border-green-600"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 p-4 rounded-xl mb-5 outline-none focus:border-green-600"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border border-gray-300 p-4 rounded-xl mb-6 outline-none focus:border-green-600"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* BUTTON */}

          <button className="bg-green-700 hover:bg-green-800 transition duration-300 text-white w-full p-4 rounded-xl text-lg font-bold shadow-lg">
            Register
          </button>
        </form>

        {/* LOGIN LINK */}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?

          <Link
            to="/login"
            className="text-green-700 font-bold ml-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;