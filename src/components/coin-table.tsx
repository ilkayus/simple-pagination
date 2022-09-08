import React from "react";
import Pagination from "./pagination";
import data from "../data/response.json";

export interface Props {}

const CoinTable = (props: Props) => {
  const table = (
    <table>
      <tr>
        <th>Cyrpto</th>
        <th>Usd Value</th>
        <th>Usd Market Cap</th>
      </tr>
      {Object.entries(data).map((el) => (
        <tr>
          <td>{el[0]}</td>
          <td>{el[1].usd}</td>
          <td>{el[1].usd_market_cap}</td>
        </tr>
      ))}
    </table>
  );

  return (
    <div>
      <h2>Coin Table</h2>
      {table}
      <Pagination></Pagination>
    </div>
  );
};
export default CoinTable;
