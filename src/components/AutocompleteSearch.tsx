import { useEffect, useState, useRef } from "react";
import { fetchSearchBarData } from "../api/provider";
import { ISearchBarData } from "../types/response.interface";
import "../css/autocompleteSearch.css";
import SearchBarListLi from "./SearchBarListLi";

const MAX_LENGTH = 50;

const AutocompleteSearch = () => {
  const [coinSearch, setCoinSearch] = useState<ISearchBarData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [autolist, setAutoList] = useState<ISearchBarData[]>([]);
  const [showAutoList, setShowAutoList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showSearchResults, setShowSearchResults] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const inputElement = useRef() as React.MutableRefObject<HTMLInputElement>;

  const populateList = (regex: RegExp | null) => {
    setAutoList(() => {
      if (regex === null) return coinSearch.slice(0, MAX_LENGTH);
      return coinSearch
        .filter((el) => el.name.match(regex))
        .slice(0, MAX_LENGTH);
    });
  };

  useEffect(() => {
    if (selectedIndex > scrollPosition + 11)
      setScrollPosition(selectedIndex - 11);
    if (selectedIndex < scrollPosition) setScrollPosition(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    fetchSearchBarData().then((res) => {
      setCoinSearch(res);
    });
    populateList(null);
  }, []);

  useEffect(() => {
    let regex: RegExp | null = null;
    if (searchText === "") regex = null;
    else regex = new RegExp(`^${searchText}`, "gi");
    populateList(regex);
  }, [searchText, coinSearch, selectedIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      inputElement.current.blur();
    }
    if (e.key === "ArrowDown") {
      setSelectedIndex((el) => Math.min(el + 1, autolist.length - 1));
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((el) => Math.max(el - 1, 0));
    }
    if (e.key === "ArrowRight") {
      setSearchText(autolist[selectedIndex].name);
      setSelectedIndex(0);
    }
    if (e.key === "Enter") {
      if (selectedIndex === 0 && searchText !== "") {
        setShowSearchResults(searchText);
        inputElement.current.blur();
      }
      setShowAutoList(false);
      setSearchText(autolist[selectedIndex].name);
      setSelectedIndex(0);
    }
  };
  const inputFocus = () => {
    setShowAutoList(true);
  };
  const inputFocusOut = () => {
    setShowAutoList(false);
    setSelectedIndex(0);
  };
  const handleListClick = (event: any, name: string) => {
    setShowSearchResults(name);
    inputElement.current.blur();
    setSearchText(name);
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
      {showSearchResults && <h4>Searching for {showSearchResults}</h4>}
      {showAutoList && (
        <ul className="autocomplete-results-container">
          {autolist.map((el, index) => {
            return (
              <SearchBarListLi
                key={el.name}
                el={el}
                index={index}
                scrollPosition={scrollPosition}
                selectedIndex={selectedIndex}
                handleListClick={handleListClick}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
