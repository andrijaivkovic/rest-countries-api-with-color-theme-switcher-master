import { useEffect, useRef, useState } from "react";
import { useCountries } from "../../contexts/CountriesContext";
import { useApp } from "../../contexts/AppContext";

const options = ["Africa", "America", "Asia", "Europe", "Oceania"];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { dispatch, filter } = useCountries();
  const { theme } = useApp();

  const dropdownSelect = useRef(null);

  const handleFilter = (option) => {
    dispatch({ type: "countries/filtered", payload: option });
    setIsOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownSelect.current.contains(e.target)) setIsOpen(false);
    };

    document.documentElement.addEventListener("click", closeDropdown);

    return () => {
      document.documentElement.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div ref={dropdownSelect} className="dropdown">
      <button
        onClick={() => setIsOpen((curr) => !curr)}
        className="dropdown__select"
      >
        <p>{filter ? filter : "Filter by region"}</p>
        <svg
          style={{ rotate: isOpen ? "180deg" : "0deg" }}
          viewBox="0 0 512 512"
          fill={theme === "dark" ? "#fff" : "#000"}
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown__options">
          <ul>
            <li>
              <button
                onClick={() => {
                  handleFilter("");
                  setIsOpen(false);
                }}
              >
                None
              </button>
            </li>
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    handleFilter(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
