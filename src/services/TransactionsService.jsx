import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export class TransactionsService {
  constructor(user) {
    if (!TransactionsService.instance) {
      this.db = getFirestore();
      this.user = user;
      TransactionsService.instance = this;
    }
    return TransactionsService.instance;
  }

  async createTransaction(transactionData) {
    try {
      const data = {
        ...transactionData,
        uid: this.user.uid,
        date: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(this.db, "transactions"), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteTransaction(transactionId) {
    try {
      const docRef = doc(this.db, "transactions", transactionId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error removing document: ", error);
      return { error: error.message };
    }
  }

  async getTransactionsByUserId() {
    try {
      const q = query(
        collection(this.db, "transactions"),
        where("uid", "==", this.user.uid)
      );
      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      return transactions;
    } catch (error) {
      return { error: error.message };
    }
  }
}