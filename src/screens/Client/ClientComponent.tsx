import {
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { ClientTableData } from "./ClientTableData";
import { hasPermission } from "../../utils/permissions.utils";
import { RedeemPoints } from "../../components";
import { useState } from "react";

interface ClientProps {
  selectedPage: number;
  userListData: any;
  isLoading: boolean;
  onDeleteHandler: (value: any) => void;
  onBlockHandler: (value: any) => void;
  onUnblockHandler: (value: any) => void;
  setSelectedPage: (value: number) => void;
  size: number;
  setSize: (value: any) => void;
  searchInput: string;
  handleChangeSearch: (value: string) => void;
  handleSwitchChange: (value: any) => void;
  navigation: any;
  onHistoryHandler: any;
  UserPointsRedeemSubmitHandler: any;
  onExportHandler?: () => void; // Add optional export handler
}

function ClientComponent({
  selectedPage,
  userListData,
  isLoading,
  onDeleteHandler,
  setSelectedPage,
  size,
  setSize,
  searchInput,
  handleChangeSearch,
  handleSwitchChange,
  onBlockHandler,
  onUnblockHandler,
  onHistoryHandler,
  UserPointsRedeemSubmitHandler,
  onExportHandler,
}: ClientProps) {
  const canUpdate = hasPermission("client", "update");
  const canDelete = hasPermission("client", "delete");
  const canView = hasPermission("client", "read");
  const showActionColumn = canDelete;
  const showStatusColumn = canUpdate;
  const HeaderData = [
    "No",
    "Name",
    "Phone Number",
    "Reason",
    "Time Period",
    "Blocked At",
    "Block History",
    "Points",
    ...(showStatusColumn ? ["Status"] : []),
    ...(showActionColumn ? ["Action"] : []),
  ];

  const listData = ClientTableData(userListData, selectedPage, size);

  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleRedeemClick = (client: any) => {
    console.log("Render");

    setSelectedClient(client);
    setShowRedeemModal(true);
  };

  const closeForm = () => {
    setShowRedeemModal(false);
    setSelectedClient(null);
  };

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  console.log("onExportHandler", onExportHandler);

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">CLIENT LIST</span>
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
        <div
          className="details-list-top-right d-flex align-items-end"
          style={{ flexDirection: "row" }}
        >
          <div style={{ width: "250px" }}>
            <SearchBar onChange={handleChangeSearch} value={searchInput} />
          </div>

          {canView && (
            <button
              className="btn btn-outline"
              style={{ color: "white", backgroundColor: "#fd8f82" }}
              type="button"
              onClick={onExportHandler}
              disabled={isLoading}
            >
              Export
            </button>
          )}
        </div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={HeaderData}
          listData={listData}
          onDeleteHandler={
            hasPermission("client", "delete") ? onDeleteHandler : undefined
          }
          onBlockHandler={
            hasPermission("client", "update")
              ? (client: any) => {
                  if (client?.blocked_at) {
                    onUnblockHandler(client);
                  } else {
                    onBlockHandler(client);
                  }
                }
              : undefined
          }
          onHistoryHandler={onHistoryHandler}
          handleChange={
            canUpdate ? (value: any) => handleSwitchChange(value) : undefined
          }
          isPointsRedeem={true}
          pointsRedeem={handleRedeemClick}
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
      {showRedeemModal && (
        <RedeemPoints
          show={showRedeemModal}
          onHide={() => setShowRedeemModal(false)}
          client={selectedClient}
          UserPointsRedeemSubmitHandler={UserPointsRedeemSubmitHandler}
          selectedClient={selectedClient}
          closeForm={closeForm}
        />
      )}
    </div>
  );
}

export default ClientComponent;
