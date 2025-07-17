export const LocationTableData = (
  crewListData: any,
  selectedPage: number,
  size: number
) => {
  return crewListData?.roles?.map((item: any, index: number) => {
    return [
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
      {
        title: "Action",
        data: item,
      },
    ];
  });
};
