import React from "react";
import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { PropertyTableData } from "./ServiceTableData";

interface PropertyProps {
  limit: number;
  setLimit: (val: number) => void;
  toggleLocationPopup: (val: boolean) => void;
  handlePropertyChangeSearch: (val: string) => void;
  onPropertyEditHandler: (val: any) => void;
  onDeletePropertyHandler: (val: any) => void;
  handlePropertySwitchChange: (val: any) => void;
  setPropertySelectedPage: (val: number) => void;
  propertySearchInput: string;
  isLoading: boolean;
  locationListData: any;
  propertySelectedPage: number;
}

function PropertyComponent({
  limit,
  setLimit,
  toggleLocationPopup,
  handlePropertyChangeSearch,
  propertySearchInput,
  locationListData,
  propertySelectedPage,
  isLoading,
  onPropertyEditHandler,
  onDeletePropertyHandler,
  handlePropertySwitchChange,
  setPropertySelectedPage,
}: PropertyProps) {
  const PropertyHeaderData = [
    "No",
    "Label",
    "Order Label",
    "Status",
    "Cost",
    "Action",
  ];

  const propertylistData = PropertyTableData(
    locationListData,
    propertySelectedPage,
    limit
  );

  return (
    <div>
      <div className="details-list-top">
        <div className="details-list-top-left">
          <div className="details-list-top-left-dropdown">
            <NumberDropdown
              data={limit}
              onChange={(e: any) => {
                setLimit(e.target.value);
                setPropertySelectedPage(1);
              }}
            />
          </div>
        </div>
        <div className="details-list-top-right">
          <Button
            className="details-list-btn"
            name={"Add Property"}
            onClick={toggleLocationPopup}
          />
          <SearchBar
            onChange={handlePropertyChangeSearch}
            value={propertySearchInput}
          />
        </div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={PropertyHeaderData}
          listData={propertylistData}
          onEditHandler={(value: any) => onPropertyEditHandler(value)}
          onDeleteHandler={(value: any) => onDeletePropertyHandler(value)}
          handleChange={(value: any) => handlePropertySwitchChange(value)}
        />
      </div>
      {propertylistData?.length > 0 ? (
        <div className="details-list-pagination">
          <Pagination
            selectedPage={propertySelectedPage}
            totalCount={locationListData?.totalPages ?? 1}
            onPageChange={(page: number) => setPropertySelectedPage(page)}
            itemsPerPage={4}
          />
        </div>
      ) : null}
    </div>
  );
}

export default PropertyComponent;
