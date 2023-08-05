import { Helmet, HelmetProvider } from "react-helmet-async";

import { useApp } from "../../contexts/AppContext";
import { useCountries } from "../../contexts/CountriesContext";

import Main from "../../components/Main/Main";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Search from "../../components/Search/Search";
import Dropdown from "../../components/Dropdown/Dropdown";
import CountryList from "../../components/CountryList/CountryList";

import ErrorMessage from "../../components/Error/Error";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";

import Toolbar from "../../components/Toolbar/Toolbar";

const Home = () => {
  const { isLoading, error, dispatch, allCountriesShown } = useCountries();
  const { theme } = useApp();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta
            name="theme-color"
            content={theme === "dark" ? "#2b3945" : "#fff"}
          />
        </Helmet>
      </HelmetProvider>
      <NavigationBar />
      <Main>
        <Toolbar>
          <Search />
          <Dropdown />
        </Toolbar>
        <CountryList />
        {error && <ErrorMessage error={error} />}
        {isLoading && <LoadingSpinner />}
        {!isLoading && !error && (
          <Button
            disabled={allCountriesShown}
            onClick={() => dispatch({ type: "countries/show-more" })}
          >
            {!allCountriesShown
              ? "Show more countries"
              : "No more countries to show"}
          </Button>
        )}
      </Main>
    </>
  );
};

export default Home;
