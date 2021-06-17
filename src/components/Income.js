import { useContext, useEffect, useState } from "react";
import {
  ParticularContext,
  RecordContext,
  RefreshTrigger,
} from "./GlobalContext";
import Searchbar from "./Searchbar";
import Table from "./Table";
import Toolbar from "./Toolbar";

const Income = (props) => {
  const records = useContext(RecordContext);
  const refresh = useContext(RefreshTrigger).doRefresh;
  const particulars = useContext(ParticularContext);
  const [income, setIncome] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDate, setMode] = useState(false);

  useEffect(() => {
    if (records.length !== 0) {
      let current = records.filter((item) => item["_type"] === "income");
      let currentParticulars = particulars.filter(
        (p) => p["_type"] === "income"
      );
      let edited = [];
      for (const item of current) {
        let curr = currentParticulars.find(
          (p) => p["id"] === item["particulars"]
        );
        edited.push({
          ...item,
          particulars: curr ? (
            curr["particular"]
          ) : (
            <div className="prose-xs sm:prose-sm lg:prose-lg xl:prose-xl">
              <code>#Undefined</code>
            </div>
          ),
        });
      }
      setIncome(edited);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records]);

  return (
    <>
      <div className="flex flex-row flex-auto mt-0.5 overflow-x-auto h-full w-full">
        <Toolbar selected={selected} navigate={props.navigate} />
        <div className="flex-auto justify-center flex-col">
          <Searchbar
            parent="records"
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isDate={isDate}
            setMode={setMode}
          />
          <Table
            dataSource={
              searchValue === ""
                ? income
                : isDate
                ? income.filter((i) => i["date"] === searchValue)
                : income.filter((i) => i["particulars"].includes(searchValue))
            }
            columns={["date", "particulars", "cash", "bank"]}
            value={selected}
            onChange={setSelected}
            loadingState={refresh}
          />
        </div>
      </div>
    </>
  );
};

export default Income;
