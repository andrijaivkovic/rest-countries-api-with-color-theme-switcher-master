import { createContext, useContext, useReducer, useEffect } from "react";

const CountriesContext = createContext();

const NUM_COUNTRIES_TO_SHOW = 20;

const initialState = {
  countries: [],
  isLoading: false,
  filter: "",
  searchQuery: "",
  error: "",
  numCountriesToShow: NUM_COUNTRIES_TO_SHOW,
  allCountriesShown: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "countries/loaded":
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
        numCountriesToShow: NUM_COUNTRIES_TO_SHOW,
        allCountriesShown: false,
      };
    case "countries/searched":
      return { ...state, searchQuery: action.payload };
    case "countries/filtered":
      return { ...state, filter: action.payload };
    case "countries/show-more":
      return {
        ...state,
        numCountriesToShow: !state.allCountriesShown
          ? state.numCountriesToShow + NUM_COUNTRIES_TO_SHOW
          : state.numCountriesToShow,
      };
    case "countries/all-countries-shown":
      return {
        ...state,
        allCountriesShown: true,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
};

const CountriesProvider = ({ children }) => {
  const [
    {
      countries,
      isLoading,
      filter,
      searchQuery,
      error,
      numCountriesToShow,
      allCountriesShown,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!searchQuery) return;

    const controller = new AbortController();

    const fetchSearchedCountries = async () => {
      dispatch({ type: "rejected", payload: "" });
      dispatch({ type: "loading", payload: true });
      dispatch({ type: "countries/filtered", payload: "" });

      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${searchQuery}?fields=flags,name,population,region,capital`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("No countries found...");

        const data = await res.json();

        dispatch({ type: "countries/loaded", payload: data });
      } catch (error) {
        if (error.name !== "AbortError") {
          dispatch({ type: "rejected", payload: error.message });
        }
      }
    };

    fetchSearchedCountries();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    if (filter || searchQuery) return;

    const fetchAllCountries = async () => {
      dispatch({ type: "rejected", payload: "" });
      dispatch({ type: "loading", payload: true });

      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital"
        );

        if (!res.ok) throw new Error("Failed to load countries...");

        const data = await res.json();

        dispatch({ type: "countries/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    };

    fetchAllCountries();
  }, [filter, searchQuery]);

  useEffect(() => {
    if (!filter) return;

    const fetchFilteredCountries = async () => {
      dispatch({ type: "rejected", payload: "" });
      dispatch({ type: "loading", payload: true });
      dispatch({ type: "countries/searched", payload: "" });

      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${filter}?fields=flags,name,population,region,capital`
        );

        if (!res.ok) throw new Error("Failed to load filtered countries...");

        const data = await res.json();

        dispatch({ type: "countries/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    };

    fetchFilteredCountries();
  }, [filter]);

  useEffect(() => {
    if (
      countries.length > 0 && countries.length <= numCountriesToShow - 1
        ? true
        : false
    ) {
      dispatch({ type: "countries/all-countries-shown" });
    }
  }, [countries.length, numCountriesToShow]);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        isLoading,
        filter,
        searchQuery,
        error,
        numCountriesToShow,
        allCountriesShown,
        dispatch,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

const useCountries = () => {
  const context = useContext(CountriesContext);

  if (context === undefined)
    throw new Error("This context was used outside of CountryProvider!");

  return context;
};

export { useCountries, CountriesProvider };
