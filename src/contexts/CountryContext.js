import { createContext, useContext, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

const CountryContext = createContext();

const initialState = {
  country: null,
  borderingCountries: null,
  isLoading: false,
  isLoadingBordering: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "country/loading":
      return { ...state, isLoading: true };
    case "country/loaded":
      return { ...state, country: action.payload, isLoading: false };
    case "country/rejected":
      return { ...state, error: action.payload };
    case "bordering/loading":
      return { ...state, isLoadingBordering: true };
    case "bordering/loaded":
      return {
        ...state,
        borderingCountries: action.payload,
        isLoadingBordering: false,
      };
    case "bordering/rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
};

const CountryProvider = ({ children }) => {
  const params = useParams();
  const name = params.name.split("_").join(" ");

  const [
    { country, borderingCountries, isLoading, isLoadingBordering, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "country/loading" });

    const fetchCountry = async () => {
      if (!name) return;

      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fields=flags,name,population,region,subregion,tld,currencies,languages,capital,borders`
        );

        if (!res.ok) throw new Error("Failed to load the country...");

        const data = await res.json();

        dispatch({ type: "country/loaded", payload: data.at(0) });
      } catch (error) {
        dispatch({ type: "country/rejected", payload: error.message });
      }
    };

    fetchCountry();
  }, [name]);

  useEffect(() => {
    if (!country) return;

    const fetchBorderingCountries = async () => {
      try {
        dispatch({ type: "bordering/loading" });

        const data = await Promise.all(
          country.borders.map(async (border) => {
            const res = await fetch(
              `https://restcountries.com/v3.1/alpha/${border}?fields=name`
            );

            if (!res.ok)
              throw new Error("Failed to load bordering countries...");

            const data = await res.json();
            return data;
          })
        );

        const dataArray = data.map((border) => border.name.common);

        dispatch({ type: "bordering/loaded", payload: dataArray });
      } catch (error) {
        dispatch({ type: "bordering/rejected", payload: error.message });
      }
    };

    fetchBorderingCountries();
  }, [country]);

  return (
    <CountryContext.Provider
      value={{
        country,
        borderingCountries,
        isLoading,
        isLoadingBordering,
        error,
        dispatch,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

const useCountry = () => {
  const context = useContext(CountryContext);

  if (context === undefined)
    throw new Error("This context was used outside of CountryProvider!");

  return context;
};

export { useCountry, CountryProvider };
