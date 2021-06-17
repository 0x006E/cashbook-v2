import { useContext, useEffect, useState } from "react";
import {
  ParticularContext,
  RecordContext,
  RefreshTrigger,
} from "./GlobalContext";
import { Particulars, Records } from "./API";
import NotFound from "./NotFound";

const DeleteRecords = ({ id, navigate, uri }) => {
  const records = useContext(RecordContext);
  const particulars = useContext(ParticularContext);
  const refreshTrigger = useContext(RefreshTrigger).setRefresh;
  const [isFound, setFound] = useState(false);
  const [isParticular, setParticular] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    if (uri.includes("particulars")) {
      setParticular(true);
    } else {
      setParticular(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let found = undefined;
    if (isParticular) {
      found = particulars.find((particular) => particular["id"] == id);
      setData(found);
    } else {
      found = records.find((record) => record["id"] == id);
      setData(found);
    }
    if (found !== undefined) {
      setFound(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isParticular, particulars]);

  if (isFound) {
    return (
      <div className="flex flex-auto bg-gray-700 w-full h-screen justify-center items-center">
        <div className="w-full h-full lg:w-1/4 lg:h-auto lg:rounded rounded-r-lg bg-white shadow-md">
          <div className="flex flex-col p-4 space-y-3 h-full">
            <div className="prose">
              <p>Are you sure you want to delete the below data? </p>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                isParticular
                  ? Particulars.delete(id).then(() => {
                      refreshTrigger(true);
                      navigate("../../");
                    })
                  : Records.delete(id).then(() => {
                      refreshTrigger(true);
                      navigate("../../");
                    });
              }}
              className="rounded bg-red-700 text-lg text-white p-1 border border-gray-400 shadow-xs"
            >
              Delete
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
          </div>
        </div>
      </div>
    );
  }
  return <NotFound />;
};

export default DeleteRecords;
