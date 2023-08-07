import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useCountry } from "../../contexts/CountryContext";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CountryDetails = () => {
  const { country, borderingCountries, isLoadingBordering } = useCountry();

  if (country) {
    const nativeName =
      Object.values(country.name.nativeName).length > 0
        ? Object.values(country.name.nativeName)[0].common
        : "None";
    const commonName = country.name.common;
    const flagSource = country.flags.svg;
    const flagAlt = country.flags.alt;
    const formatedPopulation = country.population.toLocaleString("en-US");
    const region = country.region;
    const subRegion = country.subregion ? country.subregion : "None";
    const capital = country.capital.length > 0 ? country.capital.at(0) : "None";
    const tld = country.tld.length > 0 ? country.tld.join(", ") : "None";
    const currencies =
      Object.values(country.currencies).length > 0
        ? Object.values(country.currencies).reduce((acc, curr) => {
            return acc ? acc + ", " + curr.name : acc + curr.name;
          }, "")
        : "None";
    const languages =
      Object.values(country.languages).length > 0
        ? Object.values(country.languages).reduce((acc, curr) => {
            return acc ? acc + ", " + curr : acc + curr;
          }, "")
        : "None";

    return (
      <section className="country-details">
        <div className="country-details__flag">
          <img
            className="country-details__flag--main"
            src={flagSource}
            alt={flagAlt}
          />
        </div>
        <div className="country-details__details">
          <h2 className="country-details__name">{commonName}</h2>
          <div className="country-details__main">
            <p className="country-details__native-name">
              <strong>Native name:</strong>&nbsp;
              {nativeName}
            </p>
            <p className="country-details__population">
              <strong>Population:</strong>&nbsp;
              {formatedPopulation}
            </p>

            <p className="country-details__region">
              <strong>Region:</strong>&nbsp;{region}
            </p>
            <p className="country-details__subregion">
              <strong>Sub Region:</strong>&nbsp;{subRegion}
            </p>
            <p className="country-details__capital">
              <strong>Capital:</strong>&nbsp;{capital}
            </p>
          </div>
          <div className="country-details__secondary">
            <p className="country-details__tld">
              <strong>Top Level Domain:</strong>&nbsp;{tld}
            </p>
            <p className="country-details__currencies">
              <strong>Currencies:</strong>&nbsp;{currencies}
            </p>
            <p className="country-details__languages">
              <strong>Languages:</strong>&nbsp;{languages}
            </p>
          </div>
          <div key={uuidv4()} className="country-details__bordering">
            <h3>Border Countries:</h3>
            <div className="coutry-details__bordering-countries">
              {borderingCountries && !isLoadingBordering ? (
                borderingCountries.length > 0 ? (
                  borderingCountries.map((country) => {
                    return (
                      <Link
                        to={`../country/${country.split(" ").join("_")}`}
                        key={country}
                      >
                        <button className="button">{country}</button>
                      </Link>
                    );
                  })
                ) : (
                  <p>None</p>
                )
              ) : (
                <LoadingSpinner></LoadingSpinner>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default CountryDetails;
