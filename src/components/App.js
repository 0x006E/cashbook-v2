import { useEffect, useState } from "react";
import "./../index.css";
import Maincontent from "./Maincontent";
import Navbar from "./Navbar";
import {
  RecordContext,
  ParticularContext,
  RefreshTrigger,
  OpenTrigger,
} from "./GlobalContext";
import { Particulars, Records } from "./API";
import { Font } from "@react-pdf/renderer";
import OswaldRegular from "./../fonts/Oswald-Regular.ttf";
import OswaldBold from "./../fonts/Oswald-Bold.ttf";
import OswaldMedium from "./../fonts/Oswald-Medium.ttf";
import INR from "./../fonts/IndianRupeeFont-3w4Z.ttf";

function App() {
  const [records, setRecords] = useState([]);
  const [particulars, setParticulars] = useState([]);
  const [doRefresh, setRefresh] = useState(false);
  const [isOpen, setOpen] = useState(true);

  const registerFont = () => {
    Font.register({
      family: "Oswald",
      fonts: [
        { src: OswaldRegular },
        { src: OswaldMedium, fontWeight: "medium" },
        { src: OswaldBold, fontWeight: "bold" },
      ],
    });
    Font.register({
      family: "INR",
      fonts: [{ src: INR }],
    });
  };

  useEffect(() => {
    registerFont();
  }, []);

  useEffect(() => {
    setRefresh(true);
  }, []);

  useEffect(() => {
    if (doRefresh) {
      Records.get().then((response) => {
        setRecords(response);
        setRefresh(false);
      });
      Particulars.get().then((response) => {
        setParticulars(response);
        setRefresh(false);
      });
    }
  }, [doRefresh]);

  return (
    <RefreshTrigger.Provider value={{ doRefresh, setRefresh }}>
      <OpenTrigger.Provider value={{ isOpen, setOpen }}>
        <Navbar />
        <RecordContext.Provider value={records}>
          <ParticularContext.Provider value={particulars}>
            <Maincontent />
          </ParticularContext.Provider>
        </RecordContext.Provider>
      </OpenTrigger.Provider>
    </RefreshTrigger.Provider>
  );
}

export default App;
