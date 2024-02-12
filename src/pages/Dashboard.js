import React from "react";
import { useForm } from "react-hook-form";

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container flex flex-row min-h-screen m-auto py-20">
      <div className="basis-2/3 bg-teal-500"></div>
      <div className="basis-1/3 bg-teal-900 p-4">
        <div className="card">
          <h1 className="text-teal-500 text-2xl font-bold mb-4">
            Add Transaction
          </h1>
          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="main-label">Title</label>
            <input
              className="main-input w-full"
              type="name"
              placeholder="Enter payment title"
              {...register("title", { required: "The title is required" })}
            />
            <div className="text-red-500 mt-1 mb-4">
              {errors.title && errors.title.message}
            </div>
            <label className="main-label">Amount</label>
            <input
              className="main-input w-fit"
              type="number"
              placeholder="Enter payment amount"
              {...register("amount", { required: "The amount is required" })}
            />
            <div className="text-red-500 mt-1">
              {errors.amount && errors.amount.message}
            </div>
            <button className="main-btn w-full mt-4" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
