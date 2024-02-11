import React, { useState } from "react";
import "./Login.css";
import AuthService from "../../services/AuthService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authService = new AuthService();

  const handleLogin = () => {
    authService
      .login(username, password)
      .then((response) => {
        if (response.message) {
          alert(response.message);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="flex justify-center items-center bg-login bg-image bg-no-repeat bg-cover h-screen">
      <form className="card">
        <div className="mb-4">
          <label className="main-label">Username</label>
          <input
            className="main-input"
            id="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="main-label">Password</label>
          <input
            className="main-input"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="main-btn" type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
}
