import { Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    justifyContent: "flex-start",
    width: "100%",
  },
  textContainer: {
    marginRight: 10,
    fontSize: 12,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 3,
    fontSize: 12,
    alignItems: "center",
  },
});

interface CrewInfoSettlementProps {
  crew: any;
  orderCount: number;
  startDate: any;
  endDate: any;
  currency: string;
}
const CrewInfoSettlement = ({
  crew,
  orderCount,
  startDate,
  endDate,
  currency,
}: CrewInfoSettlementProps) => (
  <View style={styles.headerContainer}>
    <View style={styles.infoContainer}>
      <Text style={styles.textContainer}>Crew Name:</Text>
      <Text>{crew.crew_name}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.textContainer}>Service Type:</Text>
      <Text>
        {crew.services
          .map((name: any) => (name.service_name ? name.service_name : "-"))
          .join(", ")}
      </Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.textContainer}>Territory:</Text>
      <Text>{currency === "SGD" ? "Singapore ($S)" : "Malaysia (RM)"}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.textContainer}>Period:</Text>
      <Text>
        {moment(startDate, "DD-MM-YYYY").format("DD/MM/YYYY")} to{" "}
        {moment(endDate, "DD-MM-YYYY").format("DD/MM/YYYY")}
      </Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.textContainer}>Total Orders:</Text>
      <Text>{orderCount}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.textContainer}>Standard Comm:</Text>
      <Text>{crew.waiver}%</Text>
    </View>
  </View>
);

export default CrewInfoSettlement;
