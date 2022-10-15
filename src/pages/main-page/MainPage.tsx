import { ImageList } from "@pages";
import { Login } from "@pages";
import React, { useState, useEffect } from "react";
import { getDatabase } from "firebase/database";

export const MainPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<string>("");
  const [dbInUse, setDbInUse] = useState<string>("");
  const db = getDatabase();

  /* console.log(process.env.REACT_APP_ENV); */

  useEffect(() => {
    switch (true) {
      case (userStatus.indexOf("wolf") > -1):
        setDbInUse("cdc/wolf");
        break;
      default: 
      setDbInUse("cdc/wolf");
    }
  }, [userStatus])

   if (!loggedIn)
      return <Login setLoggedIn={setLoggedIn} setUserStatus={setUserStatus}/>

  return <>
    <ImageList userStatus={userStatus} dbPath={dbInUse} db={db}></ImageList>
  </>
};
