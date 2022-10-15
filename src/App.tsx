import React from 'react';
import './App.css';
import { MainPage } from "@pages";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-RMvxQ_0WqECUISO8alxYZ-oY35SIsSE",
  authDomain: "cinguettio-di-chil-v2.firebaseapp.com",
  projectId: "cinguettio-di-chil-v2",
  storageBucket: "cinguettio-di-chil-v2.appspot.com",
  messagingSenderId: "434725582508",
  appId: "1:434725582508:web:605298c3fd688774ca9109",
  measurementId: "G-VFPB20019X",
  databaseURL: "https://cinguettio-di-chil-v2-default-rtdb.europe-west1.firebasedatabase.app",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);

function App() {

  return (
    <div className="App" >
      <div className="header">
        <h1 className="title">Cinguettio di Chil 2.0</h1>
      </div>
      <MainPage />
    </div>
  );
}

export default App;
