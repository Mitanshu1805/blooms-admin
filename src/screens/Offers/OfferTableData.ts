const OfferTableData = (OfferListData: any) => {
  return OfferListData?.map((offer: any, index: number) => {
    const row = [
      {
        title: "No.",
        data: index + 1,
      },
      {
        title: "Logo",
        data: offer?.image,
      },
      {
        title: "Name",
        data: offer?.name,
      },
      {
        title: "Content",
        data: offer?.content,
      },
      {
        title: "Is Active",
        data: offer,
      },
      {
        title: "Action",
        data: offer,
      },
    ];
    return row;
  });
};

export default OfferTableData;
