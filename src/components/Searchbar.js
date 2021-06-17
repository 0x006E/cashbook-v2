import { Switch } from "@headlessui/react";
import { CalendarIcon, SearchIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";
import { dateParse } from "./dateParse";

const Searchbar = ({
  parent,
  searchValue,
  setSearchValue,
  isDate,
  setMode,
}) => {
  useEffect(() => setSearchValue(""), [isDate]);

  if (parent === "particulars") {
    return (
      <div className="flex flex-none flex-row h-16 w-auto bg-gray-100 justify-center items-center border-b shadow-sm">
        <div className="w-3/5 h-3/5">
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="shadow-sm  px-3 py-2 placeholder-blueGray-300 text-gray-600 relative bg-white rounded text-sm border-2 border-gray-400 w-full pr-10"
            />
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-2">
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-none flex-row h-16 w-auto bg-gray-100 justify-center items-center border-b shadow-sm">
        <Switch.Group>
          <Switch.Label passive>
            <CalendarIcon
              className={`${
                isDate ? "text-black" : "text-gray-400"
              } w-5 h-5 md:w-7 md:h-7 text mb-0.5`}
            />
          </Switch.Label>
          <Switch
            checked={isDate}
            onChange={setMode}
            className={`${
              isDate ? "bg-black" : "bg-gray-300"
            } relative inline-flex items-center h-3 md:h-6 md:w-11 rounded-full w-5 transition-colors duration-300 mr-2 ml-1`}
          >
            <span
              className={`${
                isDate
                  ? "translate-x-2.5 md:translate-x-6"
                  : "translate-x-0.5 md:translate-x-1"
              } inline-block w-2 h-2 md:w-4 md:h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </Switch.Group>
        <div className="w-3/5 h-3/5">
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            {!isDate ? (
              <>
                {" "}
                <input
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="shadow-sm  px-3 py-2 placeholder-blueGray-300 text-gray-600 relative bg-white rounded text-sm border border-gray-300 outline-none w-full pr-10"
                />
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-2">
                  <SearchIcon />
                </span>
              </>
            ) : (
              <>
                <DayPickerInput
                  dayPickerProps={{
                    enableOutsideDays: false,
                    disabledDays: {
                      after: new Date(),
                    },
                  }}
                  inputProps={{
                    className:
                      "shadow-sm  px-3 py-2 placeholder-blueGray-300 text-gray-600 relative bg-white rounded text-sm border border-gray-300 outline-none w-12 pr-10",
                  }}
                  required
                  value={searchValue}
                  onDayChange={(day) => setSearchValue(dateParse(day))}
                />
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-2.5 text-gray-400">
                  <CalendarIcon />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Searchbar;
