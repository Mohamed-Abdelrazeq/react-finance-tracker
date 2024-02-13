import React from "react";

export default function TransactionsFeed({
  transactions,
  setTransactions,
  transactionsService,
}) {
  const handleDeleteTransaction = (transactionId) => async () => {
    await transactionsService.deleteTransaction(transactionId);
    setTransactions(
      transactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  return (
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
  );
}
