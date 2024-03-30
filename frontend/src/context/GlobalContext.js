import React, { useReducer, createContext, useEffect } from "react";
import AppReducer from "./AppReducer";
import { useNavigate } from "react-router-dom";


const initialState = {
  isLoggined: false,
  type: null,
  token:null
};

//creating context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token") !== null) {
      dispatch({
        type: "LOGIN",
        payload: {
          isLoggined: true,
          type: localStorage.getItem("type"),
          token: localStorage.getItem("token")
        }
      });
    }
  }, []);

  //actions
    function login(data) {
        dispatch({
        type: "LOGIN",
        payload: data,
        });
    }

    function logout() {
        dispatch({
        type: "LOGOUT",
        });
    }


  return (
    <GlobalContext.Provider
      value={{
        isLoggined: state.isLoggined,
        type: state.type,
        token: state.token,
        login,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
