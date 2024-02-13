import React, { useEffect, useState, useMemo, useContext } from "react";
import { TransactionsService } from "../services/TransactionsService.jsx";
import { AuthService } from "../services/AuthService.jsx";
import AddTransaction from "../components/AddTransaction.jsx";
import TransactionsFeed from "../components/TransactionsFeed.jsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const transactionsService = new TransactionsService(user);
  const authService = useMemo(() => new AuthService(), []);
  const naivgator = useNavigate();
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    const transactions = async () => {
      const response = await transactionsService.getTransactionsByUserId();
      setTransactions(response);
    };
    transactions();
  }, []);

  const handleLogout = async () => {
    const response = await authService.logout();
    if (response.error) {
      alert(response.error);
      return;
    }
    localStorage.removeItem("user");
    updateUser(null);
    alert("Logged out successfully!");
    naivgator("/");
  };

  return (
    <div className="bg-home bg-cover">
      <div className="flex flex-col-reverse md:flex-row justify-end min-h-screen m-auto w-10/12 mt-0 py-10 md:py-20">
        <TransactionsFeed
          transactions={transactions}
          setTransactions={setTransactions}
          transactionsService={transactionsService}
        />
        <AddTransaction
          transactionsService={transactionsService}
          setTransactions={setTransactions}
        />
        <div className="fixed bottom-10 right-10  w-12 h-12 rounded-full bg-teal-500">
          <button
            className="w-full h-full text-white font-bold text-2xl"
            onClick={handleLogout}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
