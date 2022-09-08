import React from "react";

import "../css/pagination.css";

export interface Props {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  showFirstLast: boolean;
  buttonCount: number;
}
const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  showFirstLast,
  buttonCount,
}: Props) => {
  const pages = Array.from(
    { length: Math.ceil(totalPosts / postsPerPage) },
    (_, i) => i + 1
  );

  return (
    <div className="pagination">
      {showFirstLast ? (
        <button key={9999} onClick={() => setCurrentPage(1)}>
          &lt;&lt;
        </button>
      ) : (
        ""
      )}
      <button
        key={0}
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        &lt;
      </button>
      {pages
        .filter((el) => {
          if (pages.length <= buttonCount) return true;
          if (currentPage - buttonCount / 2 < 1) {
            return el <= buttonCount;
          }
          if (currentPage + buttonCount / 2 > pages.length) {
            return el > pages.length - buttonCount;
          }
          if (
            currentPage - buttonCount / 2 >= 1 &&
            currentPage + buttonCount / 2 <= pages.length
          ) {
            return (
              el > currentPage - buttonCount / 2 &&
              el < currentPage + buttonCount / 2
            );
          }
        })
        .map((page) => {
          return (
            <button
              key={page + 1}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      <button
        key={9997}
        onClick={() =>
          setCurrentPage(
            currentPage < pages.length ? currentPage + 1 : currentPage
          )
        }
      >
        &gt;
      </button>
      {showFirstLast ? (
        <button key={9998} onClick={() => setCurrentPage(pages.length)}>
          &gt;&gt;
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

Pagination.defaultProps = {
  totalPosts: 100,
  showFirstLast: false,
  buttonCount: 5,
};

export default Pagination;
