import moment from "moment";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Button, LotiFiles, TableLoader } from "../..";
import { AlertType, alertService } from "../../../utils/alert.service";

function AssignCrew({
  isLoading,
  AssignCrewFormSubmitHandler,
  toggleAssignCrew,
  timeCrew,
  handleSelectedTimeSlots,
  bookSlot,
  order_id,
  item,
  timeSlotValue,
}: any) {
  const orderSlot = item?.time_slot;
  const generateTimeSlots = () => {
    console.log(item);

    const timeSlot = [];
    const firstSlot = moment(item?.first_slot, "HH:mm");
    const lastSlot = moment(item?.last_slot, "HH:mm");
    const intervalString = item?.timing_of_each_slot;
    const [hours, minutes] = intervalString.split(":").map(Number);
    const interval = moment.duration(hours, "hours").add(minutes, "minutes");
    let currentTime = moment(firstSlot);

    while (currentTime.isSameOrBefore(lastSlot)) {
      const formattedTime = currentTime.format("HH:mm");
      timeSlot.push(formattedTime);
      currentTime.add(interval);
    }

    return timeSlot;
  };

  const generateHeaderData = (timeSlot: string[]) => {
    return [
      "No",
      "Crew Name",
      "Phone Number",
      "Address",
      "Preferred Territory",
      ...timeSlot,
    ];
  };

  const generateListData = () => {
    const listData: any = [];

    timeCrew?.forEach((item: any, index: number) => {
      const crewDetails = [
        {
          title: "No.",
          data: index + 1,
        },
        {
          id: 1,
          title: "Crew Name",
          data: item?.crew_name,
        },
        {
          id: 2,
          title: "Phone Number",
          data: item.phone_number,
        },
        {
          id: 3,
          title: "Address",
          data: item?.address,
        },
        {
          id: 4,
          title: "Territory",
          data: item.preferred_work_territory,
        },
      ];

      const currentCrewTimeSlots = item?.time_slots.map((timeSlot: any) => ({
        time_slot: moment.utc(timeSlot.time_slot).format("HH:mm"),
        crew_schedule_id: timeSlot.crew_schedule_id,
        order_id: timeSlot.order_id,
      }));

      const orderUTCSlot = moment.utc(orderSlot).format("HH:mm");

      const combinedList = [
        ...crewDetails,
        ...generateTimeSlots().map((time: string) => {
          const currentSlot = currentCrewTimeSlots?.find(
            (slot: any) => slot.time_slot === time,
          );

          return {
            title: time,
            data: currentSlot
              ? currentSlot?.order_id === order_id
                ? "cb"
                : "b"
              : orderUTCSlot === time
                ? ""
                : "d",
            crew_id: item?.crew_id,
            order_id: currentSlot?.order_id,
          };
        }),
      ];

      listData.push(combinedList);
    });

    return listData;
  };

  const renderTable = () => {
    const HeaderData = generateHeaderData(generateTimeSlots());
    const listData = generateListData();
    console.log(HeaderData, listData);

    if (isLoading) {
      return <TableLoader />;
    }

    return (
      <>
        {listData.length > 0 && HeaderData ? (
          <div className="table-main-div">
            <Table>
              <Thead>
                <Tr>
                  {HeaderData.map((header: any, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              {listData.map((rowData: any, rowIndex: number) => (
                <Tbody key={rowIndex}>
                  <Tr>
                    {rowData.map((cellData: any, cellIndex: number) => {
                      return (
                        <Td
                          key={cellIndex}
                          onClick={() => {
                            cellData.data === "d"
                              ? alertService.alert({
                                  type: AlertType.Error,
                                  message:
                                    "You can not assign to this timeslot",
                                })
                              : handleSelectedTimeSlots(cellData);
                          }}
                          style={{
                            backgroundColor:
                              cellData.data === "b"
                                ? "#fd8f82"
                                : bookSlot?.crew_id === cellData?.crew_id &&
                                    bookSlot?.title === cellData?.title
                                  ? "#4caf50"
                                  : cellData.data === "cb"
                                    ? "#4caf5070"
                                    : cellData.data === "d"
                                      ? "#00000020"
                                      : "transparent",
                            color:
                              cellData.data === "b"
                                ? "#fd8f82"
                                : bookSlot?.crew_id === cellData?.crew_id &&
                                    bookSlot?.title === cellData?.title
                                  ? "#4caf50"
                                  : cellData.data === "cb" ||
                                      cellData.data === "d"
                                    ? "transparent"
                                    : "black",
                          }}
                        >
                          {cellData.data ? cellData.data : null}
                        </Td>
                      );
                    })}
                  </Tr>
                </Tbody>
              ))}
            </Table>
          </div>
        ) : (
          <LotiFiles message={"No Data Found!"} />
        )}
      </>
    );
  };

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ASSIGN CREW</span>
        </div>
        <div className="underline" />
        <div
          className="details-list-table"
          style={{ overflowY: "auto", maxHeight: "30rem" }}
        >
          {renderTable()}
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={AssignCrewFormSubmitHandler}
          />
          <Button
            isLoading={false}
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleAssignCrew}
          />
        </div>
      </div>
    </div>
  );
}

export default AssignCrew;
