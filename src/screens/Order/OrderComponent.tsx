import {
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import "./Order.scss";
import { OrderTableData } from "./OrderTableData";
import { hasPermission } from "../../utils/permissions.utils";
import { FaSyncAlt } from "react-icons/fa";
import React from "react";

interface OrderProps {
  selectedPage: number;
  userListData: any;
  isLoading: boolean;
  onDeleteHandler: (value: any) => void;
  setSelectedPage: (value: number) => void;
  size: number;
  setSize: (value: any) => void;
  searchInput: string;
  handleChangeSearch: (value: string) => void;
  navigation: any;
}

function OrderComponent({
  selectedPage,
  userListData,
  isLoading,
  onDeleteHandler,
  setSelectedPage,
  size,
  setSize,
  searchInput,
  handleChangeSearch,
  navigation,
}: OrderProps) {
  const canDelete = hasPermission("orders", "delete");
  const canView = hasPermission("orders", "read");
  const showActionColumn = canDelete;
  const SyncIcon = FaSyncAlt as React.ElementType;
  const HeaderData = [
    "No",
    "Location Name",
    "Service Name",
    "Client Name",
    // "Orders",
    <SyncIcon style={{ cursor: "pointer", color: "##ffffff" }} />,
    "Order ID",
    "City",
    "Payment Method",
    "Status",
    "Code",
    "Time Slot",
    // "Action",
    ...(showActionColumn ? ["Action"] : []),
  ];

  const listData = OrderTableData(userListData, selectedPage, size);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">ORDER LIST</span>
          <div className="details-list-top-left-dropdown">
            <NumberDropdown
              data={userListData}
              onChange={(e: any) => {
                setSize(e.target.value);
                setSelectedPage(1);
              }}
            />
          </div>
        </div>
        <div className="details-list-top-right">
          <SearchBar onChange={handleChangeSearch} value={searchInput} />
        </div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={HeaderData}
          listData={listData}
          onDeleteHandler={
            hasPermission("orders", "delete") ? onDeleteHandler : undefined
          }
          navigationClick={(value: any) =>
            navigation("/orders/details", {
              state: value,
            })
          }
          isView={true}
        />
      </div>
      {listData?.length > 0 ? (
        <div className="details-list-pagination">
          <Pagination
            selectedPage={selectedPage}
            totalCount={userListData?.totalPages ?? 1}
            onPageChange={(page: number) => setSelectedPage(page)}
            itemsPerPage={4}
          />
        </div>
      ) : null}
    </div>
  );
}

export default OrderComponent;
