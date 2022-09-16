import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CoinTable from "./components/coin-table";
import AutocompleteSearch from "./components/AutocompleteSearch";

function App() {
  return (
    <div className="App">
      <AutocompleteSearch />
      <CoinTable />
    </div>
  );
}

export default App;
