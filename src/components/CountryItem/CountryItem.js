import { Link } from "react-router-dom";

const CountryItem = ({ country }) => {
  const { name, population, region } = country;

  const flag = country.flags?.svg ? country.flags.svg : "";
  const flagAlt = country.flags.alt;
  const capital =
    country?.capital && country.capital.length > 0
      ? country.capital.at(0)
      : "None";

  const path = name.common.split(" ").join("_");

  return (
    <Link to={`country/${path}`}>
      <article className="country">
        <div className="country__flag">
          <img src={flag} alt={flagAlt} />
        </div>
        <div className="country__details">
          <h2>{name.common}</h2>
          <p>
            <strong>Population:</strong>&nbsp;
            {population.toLocaleString("en-US")}
          </p>
          <p>
            <strong>Region:</strong>&nbsp;{region}
          </p>
          <p>
            <strong>Capital:</strong>&nbsp;{capital}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default CountryItem;
