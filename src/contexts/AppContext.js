import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  theme: "dark",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "theme/changed":
      return { ...state, theme: action.payload };
    default:
      throw new Error("Unknown action");
  }
};

const AppProvider = ({ children }) => {
  const [{ theme }, dispatch] = useReducer(reducer, initialState);

  // const handleChangeTheme = (theme) => {
  //   dispatch({ type: "theme/changed", payload: theme });
  // };

  useEffect(() => {
    dispatch({ type: "theme/changed", payload: theme });
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark"
    );
    document.documentElement.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("This context was used outside of CountryProvider!");

  return context;
};

export { useApp, AppProvider };
