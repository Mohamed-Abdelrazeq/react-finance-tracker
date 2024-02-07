import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { PrivateRoutes } from "./utils/PrivateRoutes";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
