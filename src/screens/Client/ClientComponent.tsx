import {
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { ClientTableData } from "./ClientTableData";
import { hasPermission } from "../../utils/permissions.utils";

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
    // "Status",
    // "Action",
    ...(showStatusColumn ? ["Status"] : []),
    ...(showActionColumn ? ["Action"] : []),
  ];

  const listData = ClientTableData(userListData, selectedPage, size);
  console.log(listData);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

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
            hasPermission("client", "delete") ? onDeleteHandler : undefined
          }
          onBlockHandler={
            hasPermission("client", "update")
              ? (client: any) => {
                  if (client?.blocked_at) {
                    onUnblockHandler(client); // if already blocked → unblock
                  } else {
                    onBlockHandler(client); // if not blocked → block
                  }
                }
              : undefined
          }
          handleChange={
            canUpdate ? (value: any) => handleSwitchChange(value) : undefined
          }
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

export default ClientComponent;
