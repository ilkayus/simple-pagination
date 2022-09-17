import React, { useEffect, useRef } from "react";
import "../css/autocompleteSearch.css";

interface Props {
  el: any;
  index: number;
  selectedIndex: number;
  scrollPosition: number;
  handleListClick: (el: any, name: string) => void;
}

const SearchBarListLi = ({
  el,
  index,
  handleListClick,
  selectedIndex,
  scrollPosition,
}: Props) => {
  const ilRef = useRef() as React.MutableRefObject<HTMLLIElement>;

  useEffect(() => {
    if (scrollPosition === index) {
      ilRef.current.scrollIntoView();
    }
  }, [scrollPosition]);

  return (
    <li
      ref={ilRef}
      key={index + 1}
      onMouseDown={(event) => handleListClick(event, el.name)}
    >
      <div
        className={
          selectedIndex === index
            ? "autocomplete-results selected"
            : "autocomplete-results"
        }
      >
        <img src={el.thumb} alt="coin logo" />
        <h4>{el.name}</h4>
        <h4 className="market-cap-rank">{el.market_cap_rank}</h4>
      </div>
    </li>
  );
};

export default SearchBarListLi;
