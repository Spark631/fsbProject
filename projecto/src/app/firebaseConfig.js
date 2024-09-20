import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Your Firebase configuration (already initialized)
const firebaseConfig = {
  apiKey: "AIzaSyC9mUwipMNbQTgmVYHLdMy_XjRrYhoxui0",
  authDomain: "colorle-d54ad.firebaseapp.com",
  projectId: "colorle-d54ad",
  databaseURL: "https://colorle-d54ad-default-rtdb.firebaseio.com/",
  storageBucket: "colorle-d54ad.appspot.com",
  messagingSenderId: "353821275027",
  appId: "1:353821275027:web:3d9dee4b59efc0a8adae66",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
