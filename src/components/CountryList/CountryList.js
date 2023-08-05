import { useMemo } from "react";

import { useCountries } from "../../contexts/CountriesContext";

import CountryItem from "../CountryItem/CountryItem";

const CountryList = () => {
  const { countries, numCountriesToShow, isLoading, error } = useCountries();

  const shownCountries = useMemo(() => {
    return countries.slice(0, numCountriesToShow);
  }, [countries, numCountriesToShow]);

  if (!isLoading && !error)
    return (
      <section className="country-list">
        {shownCountries.map((country) => {
          return (
            <CountryItem
              key={country.name.common}
              country={country}
            ></CountryItem>
          );
        })}
      </section>
    );
};

export default CountryList;
