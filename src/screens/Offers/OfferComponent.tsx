import React from "react";
import { Button, TableComp } from "../../components";
import OfferTableData from "./OfferTableData";
import { AgGridReact } from "ag-grid-react";
import Switch from "react-switch";
import {
  Accordion,
  BrandDetails,
  Image,
  LotiFiles,
  ServiceDetails,
  TableLoader,
} from "../../components";
import { DeleteIcon, EditIcon } from "../../assets";
import { hasPermission } from "../../utils/permissions.utils";

interface OfferProps {
  offerListData: any;
  setOfferListData: any;
  isLoading: boolean;
  handleSwitchChange: (value: any) => void;
  toggleOfferPopUp: any;
  onDeleteHandler: (value: any) => void;
  onEditHandler: (value: any) => void;
  updatePosition: (value: any) => void;
}

function OfferComponent({
  offerListData,
  isLoading,
  handleSwitchChange,
  toggleOfferPopUp,
  onDeleteHandler,
  onEditHandler,
  updatePosition,
  setOfferListData,
}: OfferProps) {
  //   const offerData = offerListData.map((name: any) => name.name);
  const canUpdate = hasPermission("offers", "update");
  const canDelete = hasPermission("offers", "delete");
  const canView = hasPermission("offers", "read");
  const HeaderData = [
    "No.",
    "Image",
    "Name",
    "Content",
    "Locations",
    "Is Active",
    "Action",
  ];

  const SwitchRenderer = (props: any) => {
    const { value, api, data, colDef } = props;

    // const canUpdate = hasPermission("sub_services", "update");
    // if (!canUpdate) return null;

    const handleChange = (value: any) => {
      handleSwitchChange({
        value,
      });
    };

    return (
      <Switch
        checked={value}
        // onChange={handleChange}
        onChange={(val) =>
          handleChange({
            id: data?.offer_id,
            status: val,
          })
        }
        height={20}
        disabled={!canUpdate}
        width={50}
        uncheckedIcon={false}
        checkedIcon={false}
      />
    );
  };
  const ActionRenderer = (props: any) => {
    const { data } = props;

    // const hasUpdate = hasPermission("sub_services", "update");
    // const hasDelete = hasPermission("sub_services", "delete");

    return (
      <div className="content-middle-action-data-div">
        {/* {hasUpdate && onSubEditHandler && ( */}
        {canUpdate && (
          <Image
            style={{ paddingLeft: "10px" }}
            src={EditIcon}
            onClick={() => onEditHandler(data)}
          />
        )}
        {/* )} */}
        {/* {hasDelete && onSubDeleteHandler && ( */}

        {canDelete && (
          <Image
            style={{ paddingLeft: "10px" }}
            src={DeleteIcon}
            onClick={() => onDeleteHandler(data)}
          />
        )}
        {/* )} */}
      </div>
    );
  };

  const colDefs: any = [
    {
      headerName: "-",
      rowDrag: true,
      width: 60,
    },
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      width: 50,
    },
    {
      headerName: "Image",
      field: "image",

      cellRenderer: (params: any) => {
        if (!params.value) return null;
        return (
          <img
            src={params.value}
            // alt="offer"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        );
      },
      width: 80,
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Content",
      field: "content",
    },
    {
      headerName: "Locations",
      field: "locations",
      valueGetter: (params: any) => {
        if (!params.data?.locations) return "";
        return params.data.locations
          .map((loc: any) => loc.location_name)
          .join(", ");
      },
    },
    {
      headerName: "Is Active",
      field: "is_active",
      cellRenderer: SwitchRenderer,
      width: 100,
    },
  ];
  // if (canUpdate) {
  //   colDefs.push({
  //     headerName: "Is Active",
  //     field: "is_active",
  //     cellRenderer: SwitchRenderer,
  //     width: 100,
  //   });
  // }
  if (canUpdate || canDelete) {
    colDefs.push({
      headerName: "Action",
      field: "action",
      cellRenderer: ActionRenderer,
      width: 100,
    });
  }

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }
  const listData = OfferTableData(offerListData);
  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">OFFER LIST</span>
        </div>
        <div className="details-list-top-right">
          {hasPermission("offers", "create") && (
            <Button
              className="details-list-btn"
              name={"Add Offer"}
              onClick={toggleOfferPopUp}
            />
          )}
        </div>
      </div>
      {/* <div className="details-list-table">
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
      </div> */}
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: "50vh", marginTop: 20 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          loading={isLoading}
          rowData={offerListData}
          columnDefs={colDefs}
          rowDragManaged
          // onRowDragEnd={(event) => {
          //   const updatedData: any = [];
          //   event.api.forEachNodeAfterFilterAndSort((rowNode, index) => {
          //     updatedData.push({
          //       offer_id: rowNode.data.offer_id,
          //       position: index + 1,
          //     });
          //   });
          //   updatePosition(updatedData);
          // }}
          onRowDragEnd={(event) => {
            const newPositions: any[] = [];

            // 🔑 get the new order directly from the grid
            event.api.forEachNodeAfterFilterAndSort((rowNode, index) => {
              newPositions.push({
                offer_id: rowNode.data.offer_id, // make sure it's offer_id
                position: index + 1,
              });
            });

            console.log("Correct drag order payload:", {
              positions: newPositions,
            });

            // 🔄 Update your state so UI matches backend order
            setOfferListData(
              newPositions
                .map((pos) => {
                  const item = event.api.getRowNode(pos.offer_id)?.data;
                  return { ...item, position: pos.position };
                })
                .sort((a, b) => a.position - b.position)
            );

            // 🚀 Send to backend
            updatePosition(newPositions);
          }}
        />
      </div>
    </div>
  );
}

export default OfferComponent;
