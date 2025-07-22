import moment from "moment";
import { hasPermission } from "../../utils/permissions.utils";

export const CrewTableData = (
  crewListData: any,
  selectedPage: number,
  size: number
) => {
  const canUpdate = hasPermission("crew", "update");
  const canDelete = hasPermission("crew", "delete");
  const showActionColumn = canDelete || canUpdate;
  return crewListData?.crews?.map((item: any, index: number) => {
    const row = [
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
    ];

    if (canUpdate) {
      row.push({
        title: "Is Active",
        data: item,
      });
    }

    if (showActionColumn) {
      row.push({
        title: "Action",
        data: item,
      });
    }

    return row;
  });
};
