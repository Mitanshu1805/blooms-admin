import { View, StyleSheet, Text } from "@react-pdf/renderer";
import TableRow from "./TableRow";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
  },
  container: {
    flexDirection: "row",
    borderTopColor: "#000000",
    borderBottomColor: "#000000",
    backgroundColor: "#fd8f82",
    alignItems: "center",
    height: 24,
    textAlign: "center",
    flexGrow: 1,
  },
  no: {
    width: "3%",
    fontSize: 8,
    color: "white",
    borderRightColor: "#fd8f82",
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
    fontSize: 8,
    color: "white",
    borderRightColor: "#fd8f82",
    borderRightWidth: 1,
  },
  date: {
    width: "12%",
    fontSize: 8,
    color: "white",
    borderRightColor: "#fd8f82",
    borderRightWidth: 1,
  },
  orderId: {
    width: "15%",
    fontSize: 8,
    color: "white",
    borderRightColor: "#fd8f82",
    borderRightWidth: 1,
  },
  paymentType: {
    width: "15%",
    fontSize: 8,
    color: "white",
    borderRightColor: "#fd8f82",
    borderRightWidth: 1,
  },
  type: {
    width: "10%",
    fontSize: 8,
    color: "white",
    borderRightColor: "#fd8f82",
    borderRightWidth: 1,
  },
  hasWaiver: {
    width: "10%",
    fontSize: 8,
    color: "white",
    borderRightColor: "#fd8f82",
    borderRightWidth: 1,
  },
  creditDebit: {
    width: "20%",
    fontSize: 8,
    color: "white",
  },
});

interface SettlementTableProps {
  data: any;
  waiver: number;
}
const SettlementTable = ({ data, waiver }: SettlementTableProps) => (
  <View style={styles.tableContainer}>
    <View style={styles.container} fixed>
      <Text style={styles.no}>No</Text>
      <Text style={styles.orderId}>Order ID</Text>
      <Text style={styles.date}>Date</Text>
      <Text style={styles.amount}>Fee</Text>
      <Text style={styles.paymentType}>Payment Mode</Text>
      <Text style={styles.type}>Type</Text>
      <Text style={styles.hasWaiver}>Waiver?(%)</Text>
      <Text style={styles.creditDebit}>Credit(+)/Debit(-)</Text>
    </View>
    <TableRow data={data} waiver={waiver} />
  </View>
);

export default SettlementTable;
