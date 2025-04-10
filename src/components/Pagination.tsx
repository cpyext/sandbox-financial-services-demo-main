import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  clickedPage: (clickedPage: number) => void;
}

const Pagination = ({ page, totalPages, clickedPage }: PaginationProps) => {
  const [currPage, setCurrPage] = useState<number>(page);
  const paginationLabels: string[] = generatePaginationLabels(
    currPage,
    totalPages
  );

  return (
    <div className="flex items-center justify-center w-full px-4 py-8 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page === 1}
          className="relative inline-flex items-center rounded-md border text-tertiary bg-white px-4 py-2 text-sm font-medium   hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => clickedPage(page - 1)}
        >
          Previous
        </button>
        page {currPage} of {totalPages}
        <button
          disabled={page === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border  bg-white px-4 py-2 text-sm font-medium text-tertiary hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => clickedPage(page + 1)}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="w-full flex justify-center">
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              disabled={page === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-tertiary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                page === 1
                  ? "cursor-not-allowed pointer-events-none opacity-50"
                  : ""
              }`}
              onClick={() => clickedPage(page - 1)}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>

            {paginationLabels.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrPage(parseInt(item));
                  clickedPage(parseInt(item));
                }}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  currPage === parseInt(item)
                    ? "font-semibold bg-secondary text-primary"
                    : "bg-banner"
                } px-4 py-2 text-sm focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary border border-gray-300`}
              >
                {item}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-tertiary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                page === totalPages
                  ? "cursor-not-allowed pointer-events-none opacity-50"
                  : ""
              }`}
              onClick={() => clickedPage(page + 1)}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

function generatePaginationLabels(
  page: number,
  maxPageCount: number
): string[] {
  const paginationLabels: string[] = [];
  const previousPageNumber = page - 1;
  const nextPageNumber = page + 1;

  if (previousPageNumber > 3) {
    paginationLabels.push("1", "...", `${previousPageNumber}`);
  } else if (previousPageNumber !== 0) {
    Array.from({ length: previousPageNumber }).forEach((_, index) =>
      paginationLabels.push(`${index + 1}`)
    );
  }

  paginationLabels.push(`${page}`);

  if (maxPageCount - nextPageNumber > 2) {
    paginationLabels.push(`${nextPageNumber}`, "...", `${maxPageCount}`);
  } else if (nextPageNumber <= maxPageCount) {
    Array.from({ length: maxPageCount - nextPageNumber + 1 }).forEach(
      (_, index) => paginationLabels.push(`${nextPageNumber + index}`)
    );
  }

  return paginationLabels;
}
