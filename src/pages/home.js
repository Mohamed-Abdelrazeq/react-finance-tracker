import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to our website</h1>
        <p className="text-lg text-gray-600">
          Discover the best finance solutions
        </p>
        <div className="mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
