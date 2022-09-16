import axios from "axios";
import { ICryptoData, ISearchBarData } from "../types/response.interface";
import { postsPerPage } from "../util/utils";

const BASE_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=";
const SEARCHBAR_URL = "https://api.coingecko.com/api/v3/search?query=";

export const fetchData = async (
  currentPage: number
): Promise<ICryptoData[]> => {
  const url = `${BASE_URL}${postsPerPage}&page=${currentPage}&sparkline=false`;
  const response = await axios.get(url);

  return response.data;
};

export const fetchSearchBarData = async (
  query?: string
): Promise<ISearchBarData[]> => {
  const url = `${SEARCHBAR_URL}${query || ""}`;
  const response = await axios.get(url);

  return response.data.coins;
};
