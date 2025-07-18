import { hasPermission } from "../../utils/permissions.utils";

export const LocationTableData = (
  crewListData: any,
  selectedPage: number,
  size: number
) => {
  const canUpdate = hasPermission("Territories", "update");
  const canDelete = hasPermission("Territories", "delete");
  const showActionColumn = canDelete || canUpdate;
  return crewListData?.roles?.map((item: any, index: number) => {
    const row = [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "Logo",
        data: item?.location_image,
      },
      {
        title: "Navigate",
        data: item,
      },
      {
        title: "Template Name",
        data: item?.template,
      },
      {
        title: "Currency",
        data: item?.currency,
      },
      {
        title: "Share Count",
        data: item?.share_count,
      },
    ];

    if (showActionColumn) {
      row.push({
        title: "Action",
        data: item,
      });
    }
    return row;
  });
};
