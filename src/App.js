import "./styles/nullstyle.css";
import "./styles/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { AuthContext } from "./context";
import { refreshToken } from "./utils/RefreshTokens";

function App() {
  const [isLoading, setLoading] = useState(true);

  if (!localStorage.getItem("activeMenu")) {
    localStorage.setItem("activeMenu", "1");
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setLoading,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
