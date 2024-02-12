import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { TransactionsService } from "../services/TransactionsService";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const transactionsService = new TransactionsService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const response = await transactionsService.createTransaction({
      title: data.title,
      amount: parseFloat(data.amount),
      uid: user.uid,
    });
    if (response.error) {
      alert(response.error);
    }
    console.log(response);
  }

  useEffect(() => {
    const transactions = async () => {
      const response = await transactionsService.getTransactionsByUserId(
        user.uid
      );
      console.log(response);
    };
    transactions();
  }, []);

  return (
    <div className="bg-home">
      <div className="flex flex-row min-h-screen m-auto w-10/12 py-20">
        <div className="basis-2/3 "></div>
        <div className="card h-fit">
          <h1 className="text-teal-500 text-2xl font-bold mb-4">
            Add Transaction
          </h1>
          <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="main-label">Title</label>
            <input
              className="main-input w-72"
              type="name"
              placeholder="Enter payment title"
              {...register("title", { required: "The title is required" })}
            />
            <div className="text-red-500 mt-1 mb-4">
              {errors.title && errors.title.message}
            </div>
            <label className="main-label">Amount</label>
            <input
              className="main-input w-72"
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
