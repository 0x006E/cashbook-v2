import { useContext, useEffect, useState } from "react";
import {
    ParticularContext,
  RefreshTrigger
} from "./GlobalContext";
import { Particulars } from "./API";
import NotFound from "./NotFound";

const EditParticulars = ({ id, navigate, isNew}) => {
  const particulars = useContext(ParticularContext);
  const refreshTrigger = useContext(RefreshTrigger).setRefresh;
  const [_id, _] = useState(id);
  const [_type, setType] = useState("income");
  const [_particulars, setParticulars] = useState('');
  const [isFound, setFound] = useState(false);

  useEffect(() => {
    let found = particulars.find((particular) => particular["id"] == _id);

    if (found !== undefined) {
      setFound(true);
      setType(found["_type"]);
      setParticulars(found["particular"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, particulars]);

  useEffect(() => {
    if (isNew) {
      setFound(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  if (isFound) {
    return (
      <div className="flex flex-auto bg-gray-700 w-full h-screen justify-center items-center">
        <div className="w-full h-full lg:w-1/4 lg:h-auto lg:rounded rounded-r-lg bg-white shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              !isNew
                ? Particulars.update(
                    _id,
                    _particulars,
                    _type
                  ).then(() => {
                    refreshTrigger(true);
                    navigate("../../");
                  })
                : Particulars.add({
                    particular: _particulars,
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
            <label htmlFor="particular">Particular: </label>
            <input
              type="text"
              name="particulars"
              value={_particulars}
              onChange={(e) => setParticulars(e.target.value)}
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
  }
    return <NotFound />;
};

export default EditParticulars;
