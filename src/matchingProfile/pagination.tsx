import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
interface PaginationProps {
  toptalPages: number;
  dataPerPage: number;
  totalRecords: number; // This is a number representing total pages
  setPageNumber: (value: number | ((prev: number) => number)) => void;
  pageNumber: number;
}
const Pagination: React.FC<PaginationProps> = ({
  toptalPages,
  dataPerPage,
  totalRecords = 0,
  setPageNumber,
  pageNumber,
}) => {
  if (!toptalPages || !dataPerPage || !totalRecords || !pageNumber) {
    return <div></div>;
  }

  const startResult = (pageNumber - 1) * dataPerPage + 1;
  const endResult = Math.min(pageNumber * dataPerPage, totalRecords);

  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-primary">
              Showing <span className="font-medium">{startResult}</span> to{' '}
              <span className="font-medium">{endResult}</span> of{' '}
              <span className="font-medium">{totalRecords}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                disabled={pageNumber === 1}
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <IoChevronBackOutline className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {[...Array(toptalPages)].map((_, index) => (
                <button
                  onClick={() => setPageNumber(index + 1)}
                  key={index}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    pageNumber === index + 1
                      ? 'bg-secondary text-white'
                      : 'text-primary hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={pageNumber === toptalPages}
                onClick={() =>
                  setPageNumber((prev) => Math.min(prev + 1, toptalPages))
                }
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <IoChevronForwardOutline
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
