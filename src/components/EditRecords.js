import { useContext, useEffect, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {
  ParticularContext,
  RecordContext,
  RefreshTrigger,
} from "./GlobalContext";
import { CalendarIcon } from "@heroicons/react/outline";

import "react-day-picker/lib/style.css";
import { Records } from "./API";
import NotFound from "./NotFound";
import { dateParse } from "./dateParse";

const EditRecords = ({ id, navigate, isNew, uri }) => {
  const particulars = useContext(ParticularContext);
  const records = useContext(RecordContext);
  const refreshTrigger = useContext(RefreshTrigger).setRefresh;
  const [_id, _] = useState(id);
  const [_date, setDate] = useState("");
  const [_bank, setBank] = useState(0);
  const [_cash, setCash] = useState(0);
  const [_type, setType] = useState("income");
  const [_particulars, setParticulars] = useState(0);
  const [isFound, setFound] = useState(true);

  useEffect(() => {
    setDate();
    let found = records.find((record) => record["id"] == _id);
    if (found !== undefined) {
      let find = particulars.find((p) => parseInt(p["id"]) == parseInt(id));
      setFound(true);
      setDate(found["date"]);
      setBank(found["bank"]);
      setCash(found["cash"]);
      setType(found["_type"]);
      setParticulars(find ? found["particulars"] : null);
    } else {
      setFound(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, records]);

  useEffect(() => {
    if (isNew) {
      setFound(true);
      setDate(new Date());
      setBank(0);
      setCash(0);
      setType(uri.includes("income") ? "income" : "expenditure");
    }
  }, [isNew, records, uri]);

  if (isFound) {
    return (
      <div className="flex flex-auto bg-gray-700 w-full h-screen justify-center items-center">
        <div className="w-full h-full lg:w-1/4 lg:h-auto lg:rounded rounded-r-lg bg-white shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              !isNew
                ? Records.update(
                    _id,
                    _date,
                    _particulars,
                    _bank,
                    _cash,
                    _type
                  ).then(() => {
                    refreshTrigger(true);
                    navigate("../../");
                  })
                : Records.add({
                    date: dateParse(_date),
                    particulars: _particulars,
                    bank: _bank,
                    cash: _cash,
                    _type: _type,
                  }).then(() => {
                    refreshTrigger(true);
                    navigate("../../");
                  });
            }}
            className="flex flex-col p-4 space-y-3 h-full"
          >
            <label htmlFor="type">Type: </label>
            <select
              name="type"
              value={_type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="income">Income</option>
              <option value="expenditure">Expediture</option>
            </select>
            <label htmlFor="date">Date: </label>
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
              <DayPickerInput
                dayPickerProps={{
                  enableOutsideDays: false,
                  disabledDays: {
                    after: new Date(),
                  },
                }}
                required
                name="date"
                value={_date}
                onDayChange={(day) => setDate(day)}
              />
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3 text-gray-400">
                <CalendarIcon />
              </span>
            </div>
            <label htmlFor="particular">Particular: </label>
            <select
              name="particular"
              value={_particulars}
              onChange={(e) => setParticulars(e.target.value)}
              required
            >
              <option>Select An Option</option>
              {particulars
                .filter((p) => p["_type"] === _type)
                .map((item) => (
                  <option key={item["id"]} value={item["id"]}>
                    {item["particular"]}
                  </option>
                ))}
            </select>
            <label htmlFor="cash">Cash: </label>
            <input
              type="number"
              name="cash"
              value={_cash}
              onChange={(e) => setCash(e.target.value)}
              required
            />
            <label htmlFor="bank">Bank: </label>
            <input
              type="number"
              name="bank"
              value={_bank}
              onChange={(e) => setBank(e.target.value)}
              required
            />
            <button
              type="submit"
              className="rounded bg-blue-700 text-lg text-white p-1 border border-gray-400 shadow-xs"
            >
              {!isNew ? "Save" : "Add"}
            </button>
            <button
              type="button"
              className="rounded  p-1 border text-lg border-gray-400 shadow-xs"
              onClick={(e) => {
                e.preventDefault();
                navigate("../../");
              }}
            >
              Go Back
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <NotFound id={id} uri={uri} />;
  }
};

export default EditRecords;
