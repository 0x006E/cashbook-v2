import { pdf } from "@react-pdf/renderer";
import { useContext, useEffect, useState } from "react";
import {
  ParticularContext,
  RecordContext,
  RefreshTrigger,
} from "./GlobalContext";
import ReportPDF from "./ReportPDF";
import { saveAs } from "file-saver";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { dateParse, monthDiff } from "./dateParse";

const Report = () => {
  const records = useContext(RecordContext);
  const particulars = useContext(ParticularContext);
  const [incomes, setIncomes] = useState([]);
  const [expeditures, setExpenditures] = useState([]);
  const refresh = useContext(RefreshTrigger).doRefresh;
  const [loading, setLoading] = useState(false);
  const [view, updateView] = useState();
  const [dateArray, setDateArray] = useState([
    {
      startDate: "2021-02-01",
      endDate: "2021-02-28",
    },
  ]);
  const [date, setDate] = useState({
    startDate: "2021-02-01",
    endDate: "2021-02-28",
  });

  useEffect(() => {
    if (!refresh) {
      if (records != null && particulars != null) {
        refreshIncomeAndExpense(date.startDate, date.endDate);
        /* updateView(
          <PDFViewer className="w-full h-full z-0">
            <ReportPDF
              income={incomes}
              expense={expeditures}
              cols={["id", "particular", "cash", "bank"]}
              dateArray={[
                {
                  startDate: date.startDate ? date.startDate : "2021-02-01",
                  endDate: date.endDate ? date.endDate : "2021-02-28",
                },
              ]}
            />
          </PDFViewer>
        );*/
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particulars, records, refresh]);

  useEffect(() => {}, [date]);

  let refreshIncomeAndExpense = (startDate, endDate) => {
    let f = [];
    let startMonth = new Date(startDate).getMonth();
    let endMonth = new Date(endDate).getMonth();
    let startYear = new Date(startDate).getFullYear();
    let endYear = new Date(endDate).getFullYear();
    let i = new Date(startDate);
    while (i <= new Date(endDate)) {
      console.log(i);
      /*       if (i.getFullYear() === startYear) {
        if (i.getMonth() === startMonth) {
          f.push({
            startDate: startDate,
            endDate: dateParse(new Date(i.getFullYear(), i.getMonth() + 1, 0)),
          });
          continue;
        }
      }
      if (i.getFullYear() === endYear) {
        if (i.getMonth() === endMonth) {
          f.push({
            startDate: dateParse(new Date(i.getFullYear(), i.getMonth(), 1)),
            endDate: endDate,
          });
          break;
        }
      } */
      f.push({
        startDate: dateParse(new Date(i.getFullYear(), i.getMonth(), 1)),
        endDate: dateParse(new Date(i.getFullYear(), i.getMonth() + 1, 0)),
      });
      i.setMonth(i.getMonth() + 1);
    }
    setDateArray(f);
    if (particulars.length !== 0) {
      let i = [];
      let e = [];
      dateArray.forEach(({ startDate, endDate }, idx) => {
        console.log(startDate, endDate);
        i.push(getIncomeOrExpense("income", startDate, endDate));
        console.log(i);
        e.push(getIncomeOrExpense("expenditure", startDate, endDate));
      });
      setIncomes(i);
      setExpenditures(e);
    }
    console.log(incomes, expeditures);
  };

  let getIncomeOrExpense = (str, startDate, endDate) => {
    return particulars
      .filter((p) => p["_type"] === str)
      .map((p) => {
        let getCashOrBank = (str) => {
          let found;
          if (startDate && endDate) {
            var fromTime = new Date(startDate).getTime();
            var toTime = new Date(endDate).getTime();
            found = records.filter(
              (r) =>
                new Date(r["date"]).getTime() >= fromTime &&
                new Date(r["date"]).getTime() <= toTime
            );
          }
          return found
            ? found
                .filter((r) => parseInt(p["id"]) == parseInt(r["particulars"]))
                .map((r) => r[str])
                .reduce((a, b) => a + b, 0)
            : 0;
        };
        return {
          particular: p["particular"],
          cash: getCashOrBank("cash"),
          bank: getCashOrBank("bank"),
        };
      });
  };

  let handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const blob = await pdf(
      <ReportPDF
        income={incomes}
        expense={expeditures}
        cols={["id", "particular", "cash", "bank"]}
        dateArray={dateArray}
      />
    ).toBlob();
    setLoading(false);
    saveAs(blob, "Report - " + dateParse(new Date()) + ".pdf");
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1 className="prose text-xl sm:text-2xl md:text-4xl lg:text-6xl h-full w-full">
        <button onClick={handleClick}>
          {!refresh ? (!loading ? "Download" : "Loading please wait") : null}
        </button>
        <DayPickerInput
          value={new Date(date.startDate)}
          placeholder="From"
          onDayChange={(day) => setDate({ ...date, startDate: dateParse(day) })}
        />
        —
        <DayPickerInput
          value={new Date(date.endDate)}
          placeholder="To"
          dayPickerProps={{
            disabledDays: { before: new Date(date.startDate) },
          }}
          onDayChange={(day) => setDate({ ...date, endDate: dateParse(day) })}
        />
        <div className="w-full h-full">{view}</div>
      </h1>
    </div>
  );
};

export default Report;
