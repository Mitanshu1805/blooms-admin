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
        title: "Locations",
        data: (
          <span>
            {offer?.locations?.map((loc: any, i: number) => (
              <span key={i}>
                {loc.location_name}
                {i < offer.locations.length - 1 && ", "}
              </span>
            ))}
          </span>
        ),
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
