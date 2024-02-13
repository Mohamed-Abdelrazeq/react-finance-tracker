import React, { useContext } from "react";
import { AuthService } from "../services/AuthService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const authService = new AuthService();
  const { updateUser } = useContext(AuthContext);

  async function onSubmit(data) {
    const response = await authService.login(
      data.email.trim(),
      data.password.trim()
    );

    alert(response.message);

    if (response.user) {
      updateUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex justify-center items-center bg-home bg-image bg-no-repeat bg-cover h-screen text-neutral-800">
      <form className="card" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-500">
          Login
        </h1>
        <label className="main-label">email</label>
        <input
          className="main-input w-72"
          type="text"
          placeholder="email"
          {...register("email", { required: "The email is required" })}
        />
        <div className="text-red-500 mt-1 mb-4">
          {errors.email && errors.email.message}
        </div>
        <label className="main-label">Password</label>
        <input
          className="main-input w-72"
          type="password"
          placeholder="password"
          {...register("password", { required: "The password is required" })}
        />
        <div className="text-red-500 mt-1 mb-4">
          {errors.password && errors.password.message}
        </div>
        <button className="main-btn" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
