import {
  Accordion,
  BrandDetails,
  Button,
  Image,
  LotiFiles,
  ServiceDetails,
  TableLoader,
} from "../../components";
import Breadcrumbs from "../../components/General/common/BreadCrumbs";
import ModalDetails from "../../components/Screen/ServiceComponent/ModalDetails";
import { IconButton } from "../../components/Screen/ServiceComponent/ServiceDetails";
import PropertyComponent from "./PropertyComponent";
import "./Service.scss";
import { SubServiceTableData } from "./ServiceTableData";

import DeleteButton from "../../assets/svgs/DeleteButton.svg";
import EditButton from "../../assets/svgs/EditButton.svg";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

import Switch from "react-switch";
import { DeleteIcon, EditIcon } from "../../assets";
import { hasPermission } from "../../utils/permissions.utils";

interface ServiceProps {
  serviceDetails: any;
  selectedPage: number;
  userListData: any;
  isLoading: boolean;
  brandList: any;
  selectedBrand: string;
  modalList: any;
  selectedModal: string;
  isBrandLoading: boolean;
  isModalLoading: boolean;
  isSubServiceLoading: boolean;
  locationListData: any;
  openPropertyAccordion: boolean;
  togglePropertyAccordion: () => void;
  onEditHandler: (value: any) => void;
  onDeleteHandler: (value: any) => void;
  setSelectedPage: (value: number) => void;
  onSubEditHandler: (value: any) => void;
  onSubDeleteHandler: (value: any) => void;
  toggleSubUserPopup: (value: any) => void;
  onUpdateServiceStatus: (value: any) => void;
  handleSubServiceSwitchChange: (val: any) => void;
  toggleModalPopup: (value: any) => void;
  onBrandPress: (val: any) => void;
  toggleBrandPopup: (value: any) => void;
  onModalPress: (val: any) => void;
  onBrandEditHandler: (value: any) => void;
  onBrandDeleteHandler: (value: any) => void;
  onModelEditHandler: (value: any) => void;
  onModelDeleteHandler: (value: any) => void;
  onDeletePropertyHandler: (value: string) => void;
  toggleLocationPopup: () => void;
  onPropertyEditHandler: (value: any) => void;
  onPropertyTypeEdit: () => void;
  onPropertyTypeDelete: () => void;
  onPropertyTypeAdd: () => void;
  updatePosition: (value: any) => void;
}

function ServiceComponent({
  serviceDetails,
  selectedPage,
  userListData,
  isLoading,
  brandList,
  selectedBrand,
  modalList,
  selectedModal,
  isBrandLoading,
  isModalLoading,
  isSubServiceLoading,
  locationListData,
  openPropertyAccordion,
  togglePropertyAccordion,
  onEditHandler,
  onDeleteHandler,
  setSelectedPage,
  onSubEditHandler,
  onSubDeleteHandler,
  toggleSubUserPopup,
  onUpdateServiceStatus,
  handleSubServiceSwitchChange,
  toggleBrandPopup,
  onBrandPress,
  toggleModalPopup,
  onModalPress,
  onBrandEditHandler,
  onBrandDeleteHandler,
  onModelEditHandler,
  onModelDeleteHandler,
  onDeletePropertyHandler,
  toggleLocationPopup,
  onPropertyEditHandler,
  onPropertyTypeEdit,
  onPropertyTypeDelete,
  onPropertyTypeAdd,
  updatePosition,
}: ServiceProps) {
  const canUpdate = hasPermission("sub_services", "update");
  const canDelete = hasPermission("sub_services", "delete");
  const HeaderData = [
    "No",
    "label",
    "order_label",
    "cost",
    "currency",
    "Cost",
    "Transport Fees",
    "Description",
    "Q. Label",
    "Q. Minimum",
    "Q. Maximum",
    "Q. Default",
    "Q. Base",
    "Q. Increment",
    "Action",
  ];

  const SwitchRenderer = (props: any) => {
    const { value, api, data, colDef } = props;

    const canUpdate = hasPermission("sub_services", "update");
    if (!canUpdate) return null;

    const handleChange = (checked: boolean) => {
      handleSubServiceSwitchChange({
        option_id: data?.option_id,
        is_active: checked,
      });
    };

    return (
      <Switch
        checked={value}
        onChange={handleChange}
        height={20}
        width={50}
        uncheckedIcon={false}
        checkedIcon={false}
      />
    );
  };
  const ActionRenderer = (props: any) => {
    const { data } = props;

    const hasUpdate = hasPermission("sub_services", "update");
    const hasDelete = hasPermission("sub_services", "delete");

    return (
      <div className="content-middle-action-data-div">
        {hasUpdate && onSubEditHandler && (
          <Image
            style={{ paddingLeft: "10px" }}
            src={EditIcon}
            onClick={() => onSubEditHandler(data)}
          />
        )}
        {hasDelete && onSubDeleteHandler && (
          <Image
            style={{ paddingLeft: "10px" }}
            src={DeleteIcon}
            onClick={() => onSubDeleteHandler(data)}
          />
        )}
      </div>
    );
  };

  // Column Definitions: Defines the columns to be displayed.
  const colDefs: any = [
    {
      headerName: "-",
      rowDrag: true, // Enable row drag in this column
      width: 60,
    },
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1", // Dynamically generate row number
      width: 50,
    },
    {
      headerName: "Label",
      field: "label",
    },
    {
      headerName: "Order Label",
      field: "order_label",
    },
    {
      headerName: "Cost",
      field: "cost",
      valueFormatter: (params: any) => {
        const { cost, currency } = params.data;
        return cost + " " + currency;
      },
    },
    {
      headerName: "Is Active",
      field: "is_active",
      cellRenderer: SwitchRenderer,
      width: 100,
      hide: !hasPermission("sub_services", "update"),
    },
    {
      field: "transport_fees",
      headerName: "Transport Fees",
      valueFormatter: (params: any) => {
        const { transport_fees } = params.data;
        return transport_fees === "fee"
          ? "This is a Transport Fee"
          : transport_fees === "required"
          ? "Transport Fee Required"
          : "Transport Fee Not Required";
      },
    },
    {
      headerName: "Description",
      field: "description",
    },
    {
      headerName: "Q. Label",
      field: "quantity_label",
      width: 100,
    },
    {
      headerName: "Q. Minimum",
      field: "quantity_min",
      width: 120,
    },
    {
      headerName: "Q. Maximum",
      field: "quantity_max",
      width: 130,
    },
    {
      headerName: "Q. Default",
      field: "quantity_default",
      width: 110,
    },
    {
      headerName: "Q. Base",
      field: "quantity_base",
      width: 100,
    },
    {
      headerName: "Q. Increment",
      field: "quantity_increment",
      width: 130,
    },
    {
      field: "option_id",
      hide: true,
    },
    {
      headerName: "Action",
      cellRenderer: ActionRenderer,
      width: 100,
      hide:
        !hasPermission("sub_services", "update") &&
        !hasPermission("sub_services", "delete"),
    },
  ];

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          "Territories",
          serviceDetails?.location_name,
          serviceDetails?.service_name,
        ]}
      />
      <div className="details-list-card card">
        {/* {isLoading ? (
          <TableLoader />
        ) : ( */}
        <div>
          <ServiceDetails
            data={serviceDetails}
            onEditHandler={(value: any) => onEditHandler(value)}
            onDeleteHandler={(value: any) => onDeleteHandler(value)}
            toggleSubUserPopup={(value: any) => toggleSubUserPopup(value)}
            onUpdateServiceStatus={(value: any) => onUpdateServiceStatus(value)}
            toggleBrandPopup={toggleBrandPopup}
            propertyCount={locationListData?.options?.length}
            onPropertyTypeAdd={onPropertyTypeAdd}
          />
          {locationListData ? (
            <Accordion
              name={locationListData?.label ?? ""}
              titleContent={
                <div className="property-accordion-btn-container">
                  <IconButton icon={EditButton} onClick={onPropertyTypeEdit} />
                  <IconButton
                    icon={DeleteButton}
                    onClick={onPropertyTypeDelete}
                  />
                  <Button
                    className="details-list-btn mr-2"
                    name={"+ Add Property option"}
                    onClick={toggleLocationPopup}
                  />
                </div>
              }
              active={openPropertyAccordion}
              isActive={true}
              onClick={togglePropertyAccordion}
              content={
                <PropertyComponent
                  // toggleLocationPopup={toggleLocationPopup}
                  // isLoading={isPropertyLoading}
                  // locationListData={locationListData}
                  // onDeletePropertyHandler={onDeletePropertyHandler}
                  toggleLocationPopup={toggleLocationPopup}
                  isLoading={false}
                  locationListData={locationListData}
                  onPropertyEditHandler={onPropertyEditHandler}
                  onDeletePropertyHandler={onDeletePropertyHandler}
                />
              }
            />
          ) : null}
          {serviceDetails ? (
            <div>
              {serviceDetails.has_brand ? (
                <div>
                  {brandList?.data?.length > 0 ? (
                    <div>
                      {isBrandLoading ? (
                        <TableLoader />
                      ) : (
                        <div>
                          {brandList?.data?.map((brand: any) => (
                            <Accordion
                              name={brand.brand_name}
                              active={selectedBrand === brand?.service_brand_id}
                              isActive={brand.is_active}
                              onClick={() => {
                                onBrandPress(brand.service_brand_id);
                              }}
                              brand={
                                brand?.service_brand_id ? " ( Brand ) " : ""
                              }
                              details={
                                <div className="service-card-main-view">
                                  <BrandDetails
                                    data={brand}
                                    onEditHandler={(value: any) =>
                                      onBrandEditHandler(value)
                                    }
                                    onDeleteHandler={(value: any) =>
                                      onBrandDeleteHandler(value)
                                    }
                                    toggleSubUserPopup={(value: any) =>
                                      toggleModalPopup(value)
                                    }
                                  />
                                </div>
                              }
                              content={
                                <div>
                                  {modalList?.data?.length > 0 &&
                                  modalList.data ? (
                                    <div>
                                      {isModalLoading ? (
                                        <TableLoader />
                                      ) : (
                                        <div>
                                          {modalList?.data?.map(
                                            (model: any) => (
                                              <Accordion
                                                name={model.model_name}
                                                active={
                                                  selectedModal ===
                                                  model?.brands_model_id
                                                }
                                                isActive={model.is_active}
                                                onClick={() => {
                                                  onModalPress(
                                                    model.brands_model_id
                                                  );
                                                }}
                                                brand={
                                                  model?.brands_model_id
                                                    ? " ( Model ) "
                                                    : ""
                                                }
                                                details={
                                                  <div className="service-card-main-view">
                                                    <ModalDetails
                                                      data={model}
                                                      onEditHandler={(
                                                        value: any
                                                      ) =>
                                                        onModelEditHandler(
                                                          value
                                                        )
                                                      }
                                                      onDeleteHandler={(
                                                        value: any
                                                      ) =>
                                                        onModelDeleteHandler(
                                                          value
                                                        )
                                                      }
                                                      toggleSubUserPopup={(
                                                        value: any
                                                      ) =>
                                                        toggleSubUserPopup(
                                                          value
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                }
                                                content={
                                                  <div
                                                    className="ag-theme-quartz" // applying the Data Grid theme
                                                    style={{
                                                      height: "50vh",
                                                      marginTop: 20,
                                                    }} // the Data Grid will fill the size of the parent container
                                                  >
                                                    <AgGridReact
                                                      loading={isLoading}
                                                      rowData={
                                                        userListData?.data
                                                      }
                                                      columnDefs={colDefs}
                                                      rowDragManaged
                                                      onRowDragEnd={(event) => {
                                                        const updatedData: any =
                                                          [];
                                                        event.api.forEachNodeAfterFilterAndSort(
                                                          (rowNode, index) => {
                                                            updatedData.push({
                                                              option_id:
                                                                rowNode.data
                                                                  .option_id,
                                                              position:
                                                                index + 1,
                                                            });
                                                          }
                                                        );
                                                        updatePosition(
                                                          updatedData
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                }
                                              />
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <LotiFiles message="No Data Found!" />
                                  )}
                                </div>
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <LotiFiles message={"No Data Found!"} />
                  )}
                </div>
              ) : (
                <div
                  className="ag-theme-quartz" // applying the Data Grid theme
                  style={{ height: "50vh", marginTop: 20 }} // the Data Grid will fill the size of the parent container
                >
                  <AgGridReact
                    loading={isLoading}
                    rowData={userListData?.data}
                    columnDefs={colDefs}
                    rowDragManaged
                    onRowDragEnd={(event) => {
                      const updatedData: any = [];
                      event.api.forEachNodeAfterFilterAndSort(
                        (rowNode, index) => {
                          updatedData.push({
                            option_id: rowNode.data.option_id,
                            position: index + 1,
                          });
                        }
                      );
                      updatePosition(updatedData);
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <LotiFiles message={"No Data Found!"} />
          )}
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default ServiceComponent;
