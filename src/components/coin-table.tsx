import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./pagination";
import data from "../data/response.json";

export interface Props {}

const CoinTable = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const call = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${postsPerPage}&page=${currentPage}&sparkline=false`;
      console.log(call);
      const response = await axios.get(call);
      setMarketData(response.data);
    };
    fetchData();
  }, [currentPage]);
  console.log(marketData);
  const table = (
    <table>
      <tr>
        <th>Cyrpto</th>
        <th>Symbol</th>
        <th>Image</th>
        <th>Current Price</th>
        <th>Market Cap Rank</th>
        <th>Usd Market Cap</th>
        <th>Daily High</th>
        <th>Daily Low</th>
        <th>Daily Change</th>
        <th>Daily Change Percentage</th>
      </tr>
      {marketData.map((el: any) => (
        <tr>
          <td>{el.name}</td>
          <td>{el.symbol + "/usd"}</td>
          <td>
            <img src={el.image.replace("large", "small")} alt="cyrpto logo" />
          </td>
          <td>{el.current_price}</td>
          <td>{el.market_cap_rank}</td>
          <td>{el.market_cap}</td>
          <td>{el.high_24h}</td>
          <td>{el.low_24h}</td>
          <td>{el.price_change_24h}</td>
          <td>{el.price_change_percentage_24h}</td>
        </tr>
      ))}
    </table>
  );

  return (
    <div>
      <h2>Coin Table</h2>
      {table}
      <Pagination
        totalPosts={marketData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
export default CoinTable;
