import moment from "moment";

export const CrewTableData = (
  crewListData: any,
  selectedPage: number,
  size: number
) => {
  return crewListData?.crews?.map((item: any, index: number) => {
    return [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "Name",
        data: item?.crew_name,
      },
      {
        title: "Phone Number",
        data: item?.phone_number,
      },
      {
        title: "Is Active",
        data: item,
      },
      {
        title: "Preferred Location",
        data: item?.preferred_work_territory,
      },
      {
        title: "Special Service",
        data: item?.services,
      },
      {
        title: "Start Work Date",
        data: moment(item.preferred_start_work_date).format("DD-MM-YYYY"),
      },
      {
        title: "Address",
        data: item?.address,
      },
      {
        title: "Action",
        data: item,
      },
    ];
  });
};
