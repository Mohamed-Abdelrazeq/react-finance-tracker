import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-home">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold mb-4 text-teal-500">
          Welcome to Finance Tracker
        </h1>
        <p className="text-2xl text-teal-500">
          Discover the best financial solutions
        </p>
        <div className="mt-8">
          <button className="main-btn mr-4" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="secondary-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
