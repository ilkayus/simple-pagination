import { useEffect, useState, useRef } from "react";
import { fetchSearchBarData } from "../api/provider";
import { ISearchBarData } from "../types/response.interface";
import "../css/autocompleteSearch.css";

export interface Props {}
const AutocompleteSearch = (props: Props) => {
  const [coinSearch, setCoinSearch] = useState<ISearchBarData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [autolist, setAutoList] = useState<JSX.Element[]>([]);
  const [autolistMaxLength, setAutoListMaxLength] = useState(0);
  const [showAutoList, setShowAutoList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [showSearchResults, setShowSearchResults] = useState("");
  const inputElement = useRef() as React.MutableRefObject<HTMLInputElement>;

  const populateList = (regex: RegExp | null) => {
    let filtered: ISearchBarData[] = [];
    if (regex === null) {
      setAutoListMaxLength(coinSearch.length);
      filtered = coinSearch.slice(
        Math.max(selectedIndex - 8, 0),
        Math.min(autolistMaxLength, selectedIndex + 12)
      );
    } else {
      setAutoListMaxLength(
        coinSearch.filter((el) => el.name.match(regex)).length
      );
      filtered = coinSearch
        .filter((el) => el.name.match(regex))
        .slice(
          Math.max(selectedIndex - 8, 0),
          Math.min(autolistMaxLength, selectedIndex + 12)
        );
    }
    setSelectedList(() => {
      let list: string[] = [];
      list = filtered.map((e) => e.name);
      return list;
    });
    setAutoList(() => {
      let Dropdown = filtered.map((e, index) => {
        return (
          <li
            key={index + 1}
            onMouseDown={(event) => handleListClick(event, e.name)}
          >
            <div
              className={
                selectedIndex === index + Math.max(selectedIndex - 8, 0)
                  ? "autocomplete-results selected"
                  : "autocomplete-results"
              }
            >
              <img src={e.thumb} alt="coin logo" />
              <h4>{e.name}</h4>
              <h4 className="market-cap-rank">{e.market_cap_rank}</h4>
            </div>
          </li>
        );
      });
      return Dropdown;
      //    .slice(0, Math.min(coinSearch.length, 25));
    });
  };
  useEffect(() => {
    fetchSearchBarData().then((res) => {
      setCoinSearch(res);
      console.log("a", res);
    });
    populateList(null);
    //list();
  }, []);
  useEffect(() => {
    // console.log(searchText);
    let regex: RegExp | null = null;
    if (searchText === "") regex = null;
    else regex = new RegExp(`^${searchText}`, "gi");
    populateList(regex);
    //   console.log(autolist);
  }, [searchText, coinSearch, selectedIndex]);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: any) => {
    console.log(e.key);
    if (e.key === "Escape") {
      inputElement.current.blur();
    }
    if (e.key === "ArrowDown") {
      setSelectedIndex((el) => Math.min(el + 1, autolistMaxLength - 1));
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((el) => Math.max(el - 1, 0));
    }
    if (e.key === "ArrowRight") {
      setSearchText(selectedList[Math.min(selectedIndex, 8)]);
      setSelectedIndex(0);
      //  inputFocusOut();
    }
    if (e.key === "Enter") {
      if (selectedIndex === 0 && searchText !== "") {
        setShowSearchResults(searchText);
        inputElement.current.blur();
      }
      setSearchText(selectedList[Math.min(selectedIndex, 8)]);
      setSelectedIndex(0);
      //   inputFocusOut();
    }
    //  if (e.key === "Enter") { }
  };
  const inputFocus = () => {
    setShowAutoList(true);
  };
  const inputFocusOut = () => {
    setShowAutoList(false);
    setSelectedIndex(0);
    // setSearchText("");
  };
  const handleListClick = (event: any, name: string) => {
    setShowSearchResults(name);
    setSearchText(name);
    inputElement.current.blur();
    //  handleSearch();
  };
  const handleSearch = () => {
    setShowSearchResults(searchText);
    inputElement.current.blur();
  };

  return (
    <div className="autocomplete-conteiner">
      <div className="autocomplete-form">
        <input
          type="search"
          ref={inputElement}
          className="autocomplete-input"
          placeholder="Search for cyrpto currencies..."
          onChange={handleChange}
          value={searchText}
          onKeyDown={handleKeyDown}
          onFocus={inputFocus}
          onBlur={inputFocusOut}
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="autocomplete-submit"
          aria-label="Search"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </button>
      </div>
      {showSearchResults === "" ? (
        ""
      ) : (
        <h4>Searching for {showSearchResults}</h4>
      )}
      <ul
        className={
          showAutoList
            ? "autocomplete-results-container"
            : "autocomplete-results-container hidden"
        }
      >
        {autolist}
      </ul>
    </div>
  );
};

export default AutocompleteSearch;
