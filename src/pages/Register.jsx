import React, { useContext, useRef } from "react";
import AuthService from "../services/AuthService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const authService = new AuthService();
  const { updateUser } = useContext(AuthContext);

  async function handleLogin() {
    const response = await authService.register(
      usernameRef.current.value,
      passwordRef.current.value
    );

    alert(response.message);

    if (response.user) {
      updateUser(response.user);
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex justify-center items-center bg-home bg-image bg-no-repeat bg-cover h-screen text-neutral-800">
      <form className="card">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-500">
          Register
        </h1>
        <div className="mb-4">
          <label className="main-label">Username</label>
          <input
            className="main-input w-72"
            type="text"
            placeholder="username"
            ref={usernameRef}
          />
        </div>
        <div className="mb-6">
          <label className="main-label">Password</label>
          <input
            className="main-input w-72"
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
        </div>
        <button className="main-btn" type="button" onClick={handleLogin}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
