import { useContext, useState } from "react";
import { ParticularContext, RefreshTrigger } from "./GlobalContext";
import Searchbar from "./Searchbar";
import Table from "./Table";
import Toolbar from "./Toolbar";

const Particulars = (props) => {
  const particulars = useContext(ParticularContext);
  const refresh = useContext(RefreshTrigger).doRefresh;
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="flex flex-row flex-auto mt-0.5 overflow-x-auto h-full w-full">
        <Toolbar selected={selected} navigate={props.navigate} />
        <div className="flex-auto justify-center flex-col">
          <Searchbar
            parent="particulars"
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <div className="flex flex-row h-auto w-full space-x-2 justify-center">
            <div className="flex flex-col border-r-2 w-full">
              <p className="text-lg md:text-2xl uppercase text-blue-600 font-semibold p-4 text-center">
                Income
              </p>
              <Table
                dataSource={
                  searchValue === ""
                    ? particulars.filter((p) => p["_type"] === "income")
                    : particulars
                        .filter((p) => p["_type"] === "income")
                        .filter((p) => p["particular"].includes(searchValue))
                }
                columns={["particular"]}
                value={selected}
                onChange={setSelected}
                loadingState={refresh}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-lg md:text-2xl uppercase text-blue-600 font-semibold p-4 text-center">
                Expenditure
              </p>
              <Table
                dataSource={
                  searchValue === ""
                    ? particulars.filter((p) => p["_type"] === "expenditure")
                    : particulars
                        .filter((p) => p["_type"] === "expenditure")
                        .filter((p) => p["particular"].includes(searchValue))
                }
                columns={["particular"]}
                value={selected}
                onChange={setSelected}
                loadingState={refresh}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Particulars;
