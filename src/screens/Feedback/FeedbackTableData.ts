import moment from "moment";

export const FeedbackTableData = (
  feedbackListData: any,
  selectedPage: number,
  size: number
) => {
  return feedbackListData?.crews?.map((item: any, index: number) => {
    return [
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
        title: "Is Active",
        data: item,
      },
      {
        title: "Posted At",
        data: moment(item?.created_at).format("DD-MM-YYYY, h:mm:ss A"),
      },
      {
        title: "Action",
        data: item,
      },
    ];
  });
};
