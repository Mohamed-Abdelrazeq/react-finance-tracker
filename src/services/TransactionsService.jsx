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
      const docRef = await addDoc(collection(this.db, "transactions"), {
        ...transactionData,
        uid: this.user.uid,
      });
      return docRef.id;
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteTransaction(transactionId) {
    try {
      const docRef = doc(this.db, "transactions", transactionId);
      await deleteDoc(docRef);
    } catch (error) {
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
