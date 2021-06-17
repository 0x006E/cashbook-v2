import { Link } from "@reach/router";
import { useContext } from "react";
import { OpenTrigger } from "./GlobalContext";

const Toolbar = ({ selected, navigate }) => {
  const { isOpen } = useContext(OpenTrigger);
  return (
    <div
      className={
        "flex flex-none transition-all duration-500 overflow-hidden sticky" +
        (isOpen ? "w-8 sm:w-10 lg:w-60 " : "w-0")
      }
    >
      <div className="flex flex-nowrap flex-col flex-none bg-gray-50 border-r space-y-10 px-1.5 sm:px-2 lg:px-4 xl:px-6 h-full min-w-full">
        <div className="flex flex-col mt-3.5 lg:mt-6 xl:mt-6">
          <button
            type="button"
            className="flex flex-row hover:text-green-600 justify-self-start"
            onClick={(e) => {
              e.preventDefault();
              navigate("edit/new");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="hidden lg:block transition-all border-b-2 border-dashed border-gray-300 hover:border-green-600">
              Add new record
            </span>
          </button>
        </div>

        <div className="flex flex-col space-y-4 ">
          <button
            type="button"
            className="flex flex-row hover:text-yellow-500 disabled:opacity-0 transition-opacity disabled:cursor-default "
            disabled={selected.length === 0}
            onClick={(e) => {
              e.preventDefault();
              navigate("edit/" + selected);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            <span className="hidden lg:block transition-all border-b-2 border-dashed border-gray-300 hover:border-yellow-500">
              Edit selected record
            </span>
          </button>
        </div>
        <div className="flex flex-col space-y-4 ">
          <button
            type="button"
            className="flex flex-row hover:text-red-600 disabled:opacity-0 transition-opacity disabled:cursor-default"
            disabled={selected.length === 0}
            onClick={(e) => {
              e.preventDefault();
              navigate("delete/" + selected);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            <span className="hidden lg:block transition-all border-b-2 border-dashed border-gray-300 hover:border-red-600">
              Delete record
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
