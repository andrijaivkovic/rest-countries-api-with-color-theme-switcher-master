import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CountriesProvider } from "./contexts/CountriesContext";
import { CountryProvider } from "./contexts/CountryContext";

import Home from "./pages/Home/Home";
import Country from "./pages/Country/Country";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <CountriesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home></Home>}></Route>
              <Route
                path="country/:name"
                element={
                  <CountryProvider>
                    <Country></Country>
                  </CountryProvider>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </CountriesProvider>
      </AppProvider>
    </div>
  );
}

export default App;
