import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
export class TransactionsService {
  constructor() {
    this.db = getFirestore();
  }

  async createTransaction(transactionData) {
    try {
      const docRef = await addDoc(
        collection(this.db, "transactions"),
        transactionData
      );
      return docRef.id;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getTransactionById(transactionId) {
    try {
      const docRef = doc(this.db, "transactions", transactionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("Transaction not found");
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  async updateTransaction(transactionId, updatedData) {
    try {
      const docRef = doc(this.db, "transactions", transactionId);
      await updateDoc(docRef, updatedData);
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

  async getTransactionsByUserId(userId) {
    try {
      const q = query(
        collection(this.db, "transactions"),
        where("uid", "==", userId)
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
