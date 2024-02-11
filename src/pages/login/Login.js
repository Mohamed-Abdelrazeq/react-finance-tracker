import React, { useContext, useRef } from "react";
import "./Login.css";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const authService = new AuthService();
  const { updateUser } = useContext(AuthContext);

  async function handleLogin() {
    const response = await authService.login(
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
    <div className="flex justify-center items-center bg-login bg-image bg-no-repeat bg-cover h-screen">
      <form className="card">
        <div className="mb-4">
          <label className="main-label">Username</label>
          <input
            className="main-input"
            type="text"
            placeholder="username"
            ref={usernameRef}
          />
        </div>
        <div className="mb-6">
          <label className="main-label">Password</label>
          <input
            className="main-input"
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
        </div>
        <button className="main-btn" type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
}
