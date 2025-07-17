import { Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    backgroundColor: "#f7f7f7",
  },
  rowGroup: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  no: {
    width: "3%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  amount: {
    width: "15%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  date: {
    width: "12%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  orderId: {
    width: "15%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  paymentType: {
    width: "15%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  type: {
    width: "10%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  hasWaiver: {
    width: "10%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  creditDebit: {
    width: "20%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyCell: {
    width: "80%",
    textAlign: "center",
  },
  accumulatedNett: {
    width: "20%",
    fontSize: 8,
    color: "black",
    textAlign: "center",
    paddingTop: 0.5,
    borderTopColor: "#000000",
    borderTopWidth: 0.1,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    backgroundColor: "#f7f7f7",
  },
  info: {
    marginRight: 10,
    marginTop: 20,
    fontSize: 12,
  },
});

interface TableRowProps {
  data: any;
  waiver: number;
}

const TableRow = ({ data, waiver }: TableRowProps) => {
  let accumulateNett = 0;
  const currency = data[0].currency === "SGD" ? "S$" : "RM";
  const rows = data.flatMap((item: any, index: number) => {
    const calculate = () => {
      if (item?.cashless) {
        return item.has_waiver
          ? Number(item.order_amount)
          : (Number(item.order_amount) * (100 - waiver)) / 100;
      }

      return item.has_waiver
        ? 0.0
        : (-1 * (Number(item.order_amount) * waiver)) / 100;
    };

    const creditDebit = calculate();
    accumulateNett += creditDebit;
    const hasMaterialsFee =
      item?.materials_fee && Number(item?.materials_fee) !== 0;

    const serviceRow = (
      <View style={styles.row} key={index} wrap={false} minPresenceAhead={50}>
        <Text style={styles.no}>
          {hasMaterialsFee ? `${index + 1}a` : index + 1}
        </Text>
        <Text style={styles.orderId}>{item.oid}</Text>
        <Text style={styles.date}>
          {moment.utc(item?.time_slot).format("DD/MM/YYYY")}
        </Text>
        <Text style={styles.amount}>{item.order_amount}</Text>
        <Text style={styles.paymentType}>
          {item?.cashless ? "cashless" : "cash"}
        </Text>
        <Text style={styles.type}>Service</Text>
        <Text style={styles.hasWaiver}>{item.has_waiver ? "Yes" : "No"}</Text>
        <Text style={styles.creditDebit}>{creditDebit.toFixed(2)}</Text>{" "}
      </View>
    );

    const rowData = [serviceRow];

    if (hasMaterialsFee) {
      if (item?.cashless) {
        accumulateNett += Number(item?.materials_fee);
      }
      const materialsRow = (
        <View
          style={styles.row}
          key={`materials-${index}`}
          wrap={false}
          minPresenceAhead={50}
        >
          <Text style={styles.no}>{index + 1}b</Text>
          <Text style={styles.orderId}>{item.oid}</Text>
          <Text style={styles.date}>
            {moment.utc(item?.time_slot).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.amount}>
            {Number(item.materials_fee).toFixed(2)}
          </Text>
          <Text style={styles.paymentType}></Text>
          <Text style={styles.type}>Materials</Text>
          <Text style={styles.hasWaiver}></Text>
          <Text style={styles.creditDebit}>
            {item?.cashless ? Number(item.materials_fee).toFixed(2) : "0.00"}
          </Text>
        </View>
      );

      rowData.push(materialsRow);
    }
    return <View style={styles.rowGroup}>{rowData}</View>;
  });
  return (
    <>
      {rows}
      <View style={styles.summaryRow} wrap={false}>
        <View style={styles.emptyCell} />
        <Text style={styles.accumulatedNett}>{accumulateNett.toFixed(2)}</Text>
      </View>
      <Text style={styles.info}>
        Blooms credits {currency}
        {accumulateNett.toFixed(2)} to crew.
      </Text>
    </>
  );
};

export default TableRow;
