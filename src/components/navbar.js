import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" text-teal-500 flex flex-row h-16 px-20 justify-between items-center absolute w-full mt-4">
      <div>
        <Link to="/" className="font-bold text-2xl ">
          Finance Tracker
        </Link>
      </div>
      <div>
        <Link to="/login" className="p-0 main-btn mr-2 ">
          Login
        </Link>
        <Link to="/register" className="secondary-btn scale-50">
          Register
        </Link>
      </div>
    </nav>
  );
}
