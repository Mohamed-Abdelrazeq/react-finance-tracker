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
        <div className="basis-2/3 ">
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.title}</p>
              <p>{transaction.amount}</p>
            </div>
          ))}
        </div>
        <AddTransaction transactionsService={transactionsService} />
      </div>
    </div>
  );
}
