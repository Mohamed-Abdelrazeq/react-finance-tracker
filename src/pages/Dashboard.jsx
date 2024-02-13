import React, { useEffect, useState, useMemo } from "react";
import { TransactionsService } from "../services/TransactionsService.jsx";
import AddTransaction from "../components/AddTransaction.jsx";
import { AuthContext } from "../contexts/AuthContext.js";
import { useContext } from "react";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(AuthContext);
  const transactionsService = useMemo(
    () => new TransactionsService(user),
    [user]
  );

  const handleDeleteTransaction = (transactionId) => async () => {
    await transactionsService.deleteTransaction(transactionId);
    setTransactions(
      transactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  useEffect(() => {
    const transactions = async () => {
      const response = await transactionsService.getTransactionsByUserId();
      setTransactions(response);
    };
    transactions();
  }, [transactionsService]);

  return (
    <div className="bg-home bg-cover">
      <div className="flex flex-row min-h-screen m-auto w-10/12 py-20">
        <div className="basis-2/3 pr-12">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white px-6 py-6 mb-2 flex flex-row items-center rounded-lg shadow-2xl justify-between"
            >
              <div>
                <div className="flex flex-row items-center">
                  <p className="text-teal-700 font-mono font-bold text-xl">
                    {transaction.title.charAt(0).toUpperCase() +
                      transaction.title.slice(1) +
                      ":"}
                  </p>
                  <p className="ml-2 font-mono font-semibold text-teal-500">
                    {transaction.amount} USD
                  </p>
                </div>
                <p className="text-gray-300 font-mono font-semibold text-xs">
                  {new Date(transaction.date).toLocaleString().split(",")[0]}
                </p>
              </div>

              <button
                className="text-red-500 font-bold cursor-pointer hover:underline hover:bg-red-100 rounded-lg px-4 py-1"
                onClick={handleDeleteTransaction(transaction.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <AddTransaction
          transactionsService={transactionsService}
          transaction={transactions}
          setTransactions={setTransactions}
        />
      </div>
    </div>
  );
}
