import { StyleSheet } from "@react-pdf/renderer";

const PDFStyles = StyleSheet.create({
  body: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 25,
    flexDirection: "col",
    fontSize: 11,
    fontFamily: "Oswald",
  },
  section: {
    paddingTop: 5,
    paddingRight: 2,
    paddingLeft: 2,
    width: "50%",
  },
  layout: {
    display: "flex",
    flexDirection: "row",
  },
  table: {
    flexDirection: "column",
  },
  INR: {
    fontFamily: "INR",
  },
  supertitle: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Oswald",
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  closingBalance: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  rowID: {
    textAlign: "center",
    width: "5%",
    border: "1px solid #000 ",
    textTransform: "uppercase",
  },
  rowIDHeader: {
    textAlign: "center",
    width: "5%",
    border: "1px solid #000 ",
    fontSize: 13,
    textTransform: "uppercase",
    fontWeight: "medium",
  },
  rowParticular: {
    paddingLeft: 2,
    width: "50%",
    border: "1px solid #000 ",
  },
  rowCash: {
    textAlign: "center",
    width: "22.5%",
    border: "1px solid #000 ",
  },
  rowParticularHeader: {
    textAlign: "center",
    width: "50%",
    border: "1px solid #000 ",
    fontWeight: "medium",
    fontSize: 13,
    textTransform: "uppercase",
  },
  rowTotalHeader: {
    textAlign: "center",
    width: "50%",
    border: "1px solid #000 ",
    fontWeight: "medium",
    fontSize: 13,
    fontFamily: "Oswald",
    textTransform: "uppercase",
  },
  rowCashHeader: {
    textAlign: "center",
    width: "22.5%",
    border: "1px solid #000 ",
    fontWeight: "medium",
    fontSize: 13,
    textTransform: "uppercase",
  },
  rowTotalCashHeader: {
    textAlign: "center",
    width: "22.5%",
    border: "1px solid #000 ",
    fontWeight: "medium",
    fontSize: 13,
    fontFamily: "Oswald",
    textTransform: "uppercase",
  },
  date: {
    width: "100%",
    fontSize: 13,
    fontWeight: "bold",
    padding: 5,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Oswald",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 10,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default PDFStyles;
