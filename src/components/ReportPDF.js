import { Page, Text, View, Document } from "@react-pdf/renderer";
import PDFStyles from "./PDFStyles";

const ReportPDF = ({ income, expense, cols, dateArray }) => {
  return (
    <Document>
      {dateArray.map(({ startDate, endDate }, index) => (
        <Page
          key={index}
          style={PDFStyles.body}
          orientation="landscape"
          size="A4"
        >
          <Text style={PDFStyles.supertitle}>
            {new Date(startDate).toLocaleString("default", { month: "long" }) +
              " - " +
              new Date(startDate).getFullYear()}
          </Text>
          <View style={PDFStyles.layout}>
            <View style={PDFStyles.section}>
              <Text style={PDFStyles.title}>INCOME</Text>
              <View style={PDFStyles.row}>
                <Text style={PDFStyles.date}>Start Date:</Text>
                <Text style={PDFStyles.date}>
                  {startDate.split("-").reverse().join("-")}
                </Text>
              </View>
              <View style={PDFStyles.table}>
                <View style={PDFStyles.row}>
                  <Text style={PDFStyles.rowIDHeader}>{cols[0]}</Text>
                  <Text style={PDFStyles.rowParticularHeader}>{cols[1]}</Text>
                  <Text style={PDFStyles.rowCashHeader}>{cols[2]}</Text>
                  <Text style={PDFStyles.rowCashHeader}>{cols[3]}</Text>
                </View>

                {income[index] &&
                  income[index].map((i, idx) => (
                    <View key={idx} style={PDFStyles.row}>
                      <Text style={PDFStyles.rowID}>{idx + 1}</Text>

                      {i["particular"] === "Opening Balance" ? (
                        parseInt(i["cash"]) + parseInt(i["bank"]) === 0 ? (
                          <>
                            <Text style={PDFStyles.rowParticular}>
                              Opening Balance as on
                            </Text>
                            <Text style={PDFStyles.rowCash}></Text>
                            <Text style={PDFStyles.rowCash}></Text>
                          </>
                        ) : (
                          <>
                            <Text style={PDFStyles.rowParticular}>
                              {"Opening Balance as on " +
                                startDate.split("-").reverse().join("-")}
                            </Text>
                            <Text style={PDFStyles.rowCash}>
                              {i["cash"].toLocaleString("en-IN")}
                            </Text>
                            <Text style={PDFStyles.rowCash}>
                              {i["bank"].toLocaleString("en-IN")}
                            </Text>
                          </>
                        )
                      ) : (
                        <>
                          <Text style={PDFStyles.rowParticular}>
                            {i["particular"]}
                          </Text>
                          <Text style={PDFStyles.rowCash}>
                            {i["cash"].toLocaleString("en-IN")}
                          </Text>
                          <Text style={PDFStyles.rowCash}>
                            {i["bank"].toLocaleString("en-IN")}
                          </Text>
                        </>
                      )}
                    </View>
                  ))}
                {expense[index] &&
                expense[index].length - income[index].length > 0
                  ? [
                      ...Array(expense[index].length - income[index].length),
                    ].map((idx) => (
                      <View key={idx} style={PDFStyles.row}>
                        <Text style={PDFStyles.rowID}></Text>
                        <Text style={PDFStyles.rowParticular}></Text>
                        <Text style={PDFStyles.rowCash}> </Text>
                        <Text style={PDFStyles.rowCash}></Text>
                      </View>
                    ))
                  : null}
                <View style={PDFStyles.row}>
                  <Text style={PDFStyles.rowID}></Text>
                  <Text style={PDFStyles.rowTotalHeader}>TOTAL</Text>
                  <Text style={PDFStyles.rowTotalCashHeader}>
                    <Text style={PDFStyles.INR}>₹</Text>
                    {income[index] &&
                      income[index]
                        .map((p) => p["cash"])
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString("en-IN")}
                  </Text>
                  <Text style={PDFStyles.rowTotalCashHeader}>
                    <Text style={PDFStyles.INR}>₹</Text>
                    {income[index] &&
                      income[index]
                        .map((p) => p["bank"])
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString("en-IN")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={PDFStyles.section}>
              <Text style={PDFStyles.title}>EXPENDITURE</Text>
              <View style={PDFStyles.table}>
                <View style={PDFStyles.row}>
                  <Text style={PDFStyles.date}>End Date:</Text>
                  <Text style={PDFStyles.date}>
                    {endDate.split("-").reverse().join("-")}
                  </Text>
                </View>
                <View style={PDFStyles.row}>
                  <Text style={PDFStyles.rowIDHeader}>{cols[0]}</Text>
                  <Text style={PDFStyles.rowParticularHeader}>{cols[1]}</Text>
                  <Text style={PDFStyles.rowCashHeader}>{cols[2]}</Text>
                  <Text style={PDFStyles.rowCashHeader}>{cols[3]}</Text>
                </View>
                {expense[index] &&
                  expense[index].map((e, idx) => (
                    <View key={idx} style={PDFStyles.row}>
                      <Text style={PDFStyles.rowID}>{idx + 1}</Text>
                      <Text style={PDFStyles.rowParticular}>
                        {e["particular"]}
                      </Text>
                      <Text style={PDFStyles.rowCash}>
                        {e["cash"]
                          .toLocaleString("en-IN")
                          .toLocaleString("en-IN")}
                      </Text>
                      <Text style={PDFStyles.rowCash}>
                        {e["bank"]
                          .toLocaleString("en-IN")
                          .toLocaleString("en-IN")}
                      </Text>
                    </View>
                  ))}
                {income[index].length - expense[index].length > 0
                  ? [...Array(income.length - expense.length)].map((idx) => (
                      <View key={idx} style={PDFStyles.row}>
                        <Text style={PDFStyles.rowID}></Text>
                        <Text style={PDFStyles.rowParticular}></Text>
                        <Text style={PDFStyles.rowCash}> </Text>
                        <Text style={PDFStyles.rowCash}></Text>
                      </View>
                    ))
                  : null}
                <View style={PDFStyles.row}>
                  <Text style={PDFStyles.rowID}></Text>
                  <Text style={PDFStyles.rowTotalHeader}>TOTAL</Text>
                  <Text style={PDFStyles.rowTotalCashHeader}>
                    <Text style={PDFStyles.INR}>₹</Text>
                    {expense[index] &&
                      expense[index]
                        .map((p) => p["cash"])
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString("en-IN")}
                  </Text>
                  <Text style={PDFStyles.rowTotalCashHeader}>
                    <Text style={PDFStyles.INR}>₹</Text>
                    {expense[index] &&
                      expense[index]
                        .map((p) => p["bank"])
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString("en-IN")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={PDFStyles.closingBalance}>
            <Text style={PDFStyles.rowTotalHeader}>Closing Balance</Text>
            <Text style={PDFStyles.rowTotalCashHeader}>
              <Text style={PDFStyles.INR}>₹</Text>
              {(
                income[index]
                  .map((p) => p["cash"] + p["bank"])
                  .reduce((a, b) => a + b, 0) -
                expense[index]
                  .map((p) => p["cash"] + p["bank"])
                  .reduce((a, b) => a + b, 0)
              ).toLocaleString("en-IN")}
            </Text>
          </View>
          <Text
            style={PDFStyles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
    </Document>
  );
};

export default ReportPDF;
