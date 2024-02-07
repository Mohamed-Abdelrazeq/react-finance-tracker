import React from "react";
import "./Login.css";

export default function Login() {
  return (
    <div
      className="flex justify-center items-center bg-login bg-image bg-no-repeat bg-cover"
      style={{ minHeight: `calc(100vh - 64px)` }}
    >
      <form className="bg-white px-8 pt-6 pb-8 flex flex-col items-center">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-regular mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border  w-72 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-regular mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border  w-72 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        <button className="main-btn" type="button">
          Sign In
        </button>
      </form>
    </div>
  );
}
