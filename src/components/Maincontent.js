import Welcome from "./Welcome";
import Income from "./Income";
import Expenditure from "./Expenditure";
import Particulars from "./Particulars";
import Report from "./Report";
import EditRecords from "./EditRecords";
import FadeTransitionRouter from "./FadeTransitionRouter";
import NotFound from "./NotFound";
import EditParticulars from "./EditParticulars";
import DeleteRecords from "./DeleteRecords";

const Maincontent = () => {
  return (
    <>
      <div className="flex flex-auto w-full">
        <FadeTransitionRouter>
          <NotFound default />
          <Welcome path="/" />
          <Income path="/income" />
          <EditRecords path="/income/edit/:id" />
          <EditRecords path="/income/edit/new" isNew={true} />
          <DeleteRecords path="/income/delete/:id" />
          <Expenditure path="/expenditure" />
          <EditRecords path="/expenditure/edit/:id" />
          <EditRecords path="/expenditure/edit/new" isNew={true} />
          <DeleteRecords path="/expenditure/delete/:id" />
          <Particulars path="/particulars" />
          <EditParticulars path="/particulars/edit/:id" />
          <EditParticulars path="/particulars/edit/new" isNew={true} />
          <DeleteRecords path="/particulars/delete/:id" />
          <Report path="/report" />
        </FadeTransitionRouter>
      </div>
    </>
  );
};

export default Maincontent;
