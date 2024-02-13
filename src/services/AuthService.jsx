import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export class AuthService {
  constructor() {
    this.auth = getAuth();
  }

  responseMessage = Object.freeze({
    invalidCredential: "Invalid credential",
    invalidEmail: "Invalid email",
    weakPassword: "Password should be at least 6 characters",
    loggedIn: "Logged in successfully!",
    registered: "Registered successfully!",
    somethingWentWrong: "Something went wrong",
  });

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        message: this.responseMessage.loggedIn,
        user: user,
      };
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        return { message: this.responseMessage.invalidCredential };
      }
      return { message: this.responseMessage.somethingWentWrong };
    }
  }

  async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        message: this.responseMessage.registered,
        user: user,
      };
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        return { message: this.responseMessage.invalidEmail };
      }
      if (error.code === "auth/weak-password") {
        return { message: this.responseMessage.weakPassword };
      }
      if (error.code === "auth/email-already-in-use") {
        return { message: "Email already in use" };
      }
      return { message: this.responseMessage.somethingWentWrong };
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      return { message: "Logged out successfully!" };
    } catch (error) {
      return { message: this.responseMessage.somethingWentWrong };
    }
  }
}
