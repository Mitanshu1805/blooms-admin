import React from "react";
import { Button, TableComp } from "../../components";
import OfferTableData from "./OfferTableData";

interface OfferProps {
  offerListData: any;
  isLoading: boolean;
  handleSwitchChange: (value: any) => void;
  toggleOfferPopUp: any;
  onDeleteHandler: (value: any) => void;
  onEditHandler: (value: any) => void;
}

function OfferComponent({
  offerListData,
  isLoading,
  handleSwitchChange,
  toggleOfferPopUp,
  onDeleteHandler,
  onEditHandler,
}: OfferProps) {
  //   const offerData = offerListData.map((name: any) => name.name);
  const HeaderData = [
    "No.",
    "Image",
    "Name",
    "Content",
    "Locations",
    "Is Active",
    "Action",
  ];

  const listData = OfferTableData(offerListData);
  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">OFFER LIST</span>
        </div>
        <div className="details-list-top-right">
          <Button
            className="details-list-btn"
            name={"Add Offer"}
            onClick={toggleOfferPopUp}
          />
        </div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={HeaderData}
          listData={listData}
          onEditHandler={onEditHandler}
          // onEditHandler={
          //   hasPermission("user", "update") ? onEditHandler : undefined
          // }
          // onEditOurselves={
          //   hasPermission("user", "update") ? onEditOurselves : undefined
          // }
          onDeleteHandler={onDeleteHandler}
          handleChange={(value: any) => handleSwitchChange(value)}
        />
      </div>
    </div>
  );
}

export default OfferComponent;
