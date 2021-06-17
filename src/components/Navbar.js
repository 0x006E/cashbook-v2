import { Link } from "@reach/router";
import { useContext } from "react";
import { OpenTrigger, RefreshTrigger } from "./GlobalContext";

const Navbar = () => {
  const refreshContext = useContext(RefreshTrigger);
  const { isOpen, setOpen } = useContext(OpenTrigger);

  return (
    <>
      <div
        className={
          "flex flex-col flex-none overflow-hidden transition-all duration-500 bg-blue-50 h-screen items-center border-r-2 border-dashed " +
          (isOpen ? "w-8 sm:w-10 lg:w-12" : "w-0")
        }
      >
        <Link to="/">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10  text-blue-700 mt-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </Link>
        <div className="flex flex-col items-center space-y-10 mt-10">
          <Link to="/income">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-700 shadow-md hover:shadow-lg rounded-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </Link>
          <Link to="/expenditure">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-700 shadow-md hover:shadow-lg rounded-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              ></path>
            </svg>
          </Link>
          <Link to="/particulars">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-500 shadow-md hover:shadow-lg rounded-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
          </Link>
          <Link to="/report">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-700 shadow-md hover:shadow-lg rounded-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              ></path>
            </svg>
          </Link>
          <button
            type="button"
            className="rounded-full shadow-md hover:shadow-lg"
            onClick={() => refreshContext.setRefresh(true)}
          >
            <svg
              className={
                refreshContext.doRefresh
                  ? "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 animate-reverse-spin text-blue-600"
                  : "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-700"
              }
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="rounded-full bg-blue-800  shadow-xl hover:shadow-2xl p-2 xl:p-3 absolute bottom-5 left-5  z-10"
        onClick={() => setOpen(!isOpen)}
      >
        <svg
          className={
            "w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 transform text-white transition-transform duration-150 " +
            (isOpen ? "rotate-0" : "rotate-180")
          }
          fill="none"
          stroke="currentColor"
          viewBox="0 0 26 26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </>
  );
};

export default Navbar;
