import React, { useEffect, useState, useMemo } from "react";
import { TransactionsService } from "../services/TransactionsService.jsx";
import AddTransaction from "../components/AddTransaction.jsx";
import TransactionsFeed from "../components/TransactionsFeed.jsx";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const transactionsService = useMemo(() => new TransactionsService(), []);

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
        <TransactionsFeed
          transactions={transactions}
          setTransactions={setTransactions}
          transactionsService={transactionsService}
        />
        <AddTransaction
          transactionsService={transactionsService}
          transaction={transactions}
          setTransactions={setTransactions}
        />
      </div>
    </div>
  );
}
