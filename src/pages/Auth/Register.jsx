import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    identity: "",
    password: "",
    confirmPassword: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/user/register",
        input
      );
      console.log(result.data);
      setInput({
        firstName: "",
        lastName: "",
        identity: "",
        password: "",
        confirmPassword: "",
      });
      e.target.closest("dialog").close();
      toast.success("Register success");
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      console.log(errMessage);
      toast.error(errMessage);
    }
  };
  return (
    <div className="flex justify-center items-center max-h-screen bg-gradient-to-r from-yellow-100 to-orange-200 py-10">
      <form
        onSubmit={hdlRegister}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-4">
          Sign Up
        </h1>
        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            value={input.firstName}
            onChange={hdlChange}
            placeholder="First Name"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-white"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            value={input.lastName}
            onChange={hdlChange}
            placeholder="Last Name"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-white"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="identity"
            value={input.identity}
            onChange={hdlChange}
            placeholder="Email or Phone Number"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-white"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="Password"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
            placeholder="Confirm Password"
            className="input input-bordered w-full p-3 rounded-md focus:border-orange-500 focus:ring-orange-500 transition duration-200 bg-white"
          />
        </div>
        <button
          type="submit"
          className="btn w-full bg-orange-600 text-white hover:bg-orange-700 transition duration-200 rounded-md py-2 border-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
