import {
  Page,
  Document,
  StyleSheet,
  Image,
  Font,
  View,
  Text,
} from "@react-pdf/renderer";
import { CashStatement } from "../../assets";
import CrewInfoSettlement from "./CrewInfoSettlement";
import SettlementTable from "./SettlementTable";

Font.register({
  family: "Poppins",
  src: "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDz8V1tvFP-KUEg.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    fontFamily: "Poppins",
  },
  content: {
    padding: 10,
  },
  header: {
    width: "100%",
    height: "auto",
    alignSelf: "center",
    marginBottom: 20,
  },
  footer: {
    width: "100%",
    height: "auto",
    alignSelf: "center",
  },
  tableContainer: {
    flexGrow: 1,
    marginVertical: 20,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  tableColHeader: {
    width: "33%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    backgroundColor: "#DDD",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "33%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 5,
  },
  remarks: {
    marginTop: 30,
    fontSize: 12,
  },
  remarksLabel: {
    marginBottom: 2,
  },
});

interface CrewSettlementProps {
  data: any;
  crew: any;
  remarks: string;
  startDate: any;
  endDate: any;
}
const CrewSettlementDoc = ({
  data,
  crew,
  remarks,
  startDate,
  endDate,
}: CrewSettlementProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.header} src={CashStatement} fixed />
      <View style={styles.content}>
        <CrewInfoSettlement
          crew={crew}
          orderCount={data?.length}
          startDate={startDate}
          endDate={endDate}
          currency={data[0].currency}
        />
        <SettlementTable data={data} waiver={crew.waiver} />
        <View style={styles.remarks} wrap={false} minPresenceAhead={20000}>
          <Text style={styles.remarksLabel}>Remarks:</Text>
          <Text>{remarks.trim() === "" ? "-" : remarks}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default CrewSettlementDoc;
