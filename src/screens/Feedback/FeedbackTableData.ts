import moment from "moment";
import { hasPermission } from "../../utils/permissions.utils";

export const FeedbackTableData = (
  feedbackListData: any,
  selectedPage: number,
  size: number
) => {
  const canDelete = hasPermission("Feedback", "delete");
  const canUpdate = hasPermission("Feedback", "update");
  const showActionColumn = canDelete;

  return feedbackListData?.crews?.map((item: any, index: number) => {
    const row = [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "Feedback",
        data: item?.feedback,
      },
      {
        title: "Rating",
        data: item?.rating,
      },
      {
        title: "Customer Phone",
        data: item?.customer_no,
      },

      {
        title: "Posted At",
        data: moment(item?.created_at).format("DD-MM-YYYY, h:mm:ss A"),
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
