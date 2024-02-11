import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-cyan-500 text-white flex flex-row h-16 px-20 justify-between items-center absolute w-full">
      <div>
        <Link to="/" className="font-bold text-2xl">
          Finance Tracker
        </Link>
      </div>
      <div>
        <Link to="/login" className="mr-6">
          Login
        </Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
