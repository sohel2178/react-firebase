import * as app from "firebase";

const firebaseConfig = {
  // apiKey: "AIzaSyB8anHPrz7BCAGTyfeY6dbrYbu0a6CI5aU",
  // authDomain: "bike-c318f.firebaseapp.com",
  // databaseURL: "https://bike-c318f.firebaseio.com",
  // projectId: "bike-c318f",
  // storageBucket: "",
  // messagingSenderId: "626092705153",
  // appId: "1:626092705153:web:8e420ac966aa4b2d"

  apiKey: "AIzaSyAw4aWIgsCJvc9zoISFLiZDMokjJZ2HK_8",
  authDomain: "sino-72f9d.firebaseapp.com",
  databaseURL: "https://sino-72f9d.firebaseio.com",
  projectId: "sino-72f9d",
  storageBucket: "",
  messagingSenderId: "997737582322",
  appId: "1:997737582322:web:3dd501ac304df1570c8a6b"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
  }

  createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password);
  };

  currentUser = () => this.auth.currentUser;

  devices = uid =>
    this.db
      .ref("devices")
      .orderByChild("uid")
      .equalTo(uid);
}

export default Firebase;
