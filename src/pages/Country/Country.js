import { useNavigate } from "react-router-dom";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { v4 as uuidv4 } from "uuid";

import { useCountry } from "../../contexts/CountryContext";
import { useApp } from "../../contexts/AppContext";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ErrorMessage from "../../components/Error/Error";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Main from "../../components/Main/Main";
import Button from "../../components/Button/Button";
import CountryDetails from "../../components/CountryDetails/CountryDetails";

const Country = () => {
  const { isLoading, error } = useCountry();
  const { theme } = useApp();

  const navigate = useNavigate();

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
        <Button onClick={() => navigate(-1)} type={"back"}>
          <svg
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            fill={theme === "dark" ? "#fff" : "#000"}
            viewBox="0 0 320 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>

          <p>Back</p>
        </Button>
        {error && <ErrorMessage error={error} />}
        {isLoading && <LoadingSpinner />}
        {!isLoading && <CountryDetails key={uuidv4()}></CountryDetails>}
      </Main>
    </>
  );
};

export default Country;
