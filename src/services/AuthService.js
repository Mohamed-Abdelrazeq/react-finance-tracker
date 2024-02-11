import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

class AuthService {
  constructor() {
    this.auth = getAuth();
  }

  responseMessage = Object.freeze({
    invalidCredential: "Invalid credential",
    loggedIn: "Logged in successfully!",
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
      console.log(error.code);
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
      return user;
    } catch (error) {
      const errorMessage = error.message;
      return errorMessage;
    }
  }
}

export default AuthService;
