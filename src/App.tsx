import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login&Signup/Login";
import DefaultLayout from "./Layout/DefaultLayout";
import { UserData } from "./utils/interface";

import "./App.css";
import Signup from "./Components/Login&Signup/Signup";
export const AppContext = createContext<any>(null);

const App = () => {
  const userData: UserData = JSON.parse(localStorage.getItem("user")!);
  const [user, setUser] = useState<UserData | null>(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState<boolean>(
    user ? true : false
  );
  return (
    <>
      <AppContext.Provider
        value={{
          isUserLoggedIn,
          setUserLoggedin,
          user,
          setUser,
        }}
      >
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </>
  );
};

export default App;
