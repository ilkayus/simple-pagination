import React, { useEffect, useState } from "react";
import Pagination from "./pagination";

import "../css/coin-table.css";
import { fetchData } from "../api/provider";
import { postsPerPage, tableHeaders } from "../util/utils";
import { ICryptoData } from "../types/response.interface";

export interface Props {}

const CoinTable = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);
  const [marketData, setMarketData] = useState<ICryptoData[]>([]);

  useEffect(() => {
    fetchData(currentPage).then((res) => setMarketData(res));
  }, [currentPage]);

  console.log(marketData);
  const table = (
    <table>
      <tr>
        {tableHeaders.map((text) => (
          <th>{text} </th>
        ))}
      </tr>
      {marketData.map((el: any) => (
        <tr>
          <td>{el.name}</td>
          <td>{el.symbol + "/usd"}</td>
          <td>
            <img src={el.image.replace("large", "small")} alt="cyrpto logo" />
          </td>
          <td className={el.price_change_24h > 0 ? "positive" : "negative"}>
            {el.current_price.toFixed(3)}
          </td>
          <td>{el.market_cap_rank}</td>
          <td>{(el.market_cap / 1000000000).toFixed(2) + " $B"}</td>
          <td>{el.high_24h.toFixed(3)}</td>
          <td>{el.low_24h.toFixed(3)}</td>
          <td className={el.price_change_24h > 0 ? "positive" : "negative"}>
            {el.price_change_24h.toFixed(3)}
          </td>
          <td className={el.price_change_24h > 0 ? "positive" : "negative"}>
            {el.price_change_percentage_24h.toFixed(3)}
          </td>
        </tr>
      ))}
    </table>
  );

  return (
    <div>
      <h2>Coin Table</h2>
      {table}
      <Pagination
        totalPosts={990}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        showFirstLast={false}
        buttonCount={5}
      />
    </div>
  );
};
export default CoinTable;
