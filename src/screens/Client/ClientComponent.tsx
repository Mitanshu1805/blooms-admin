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
}: ClientProps) {
  const canUpdate = hasPermission("Client", "update");
  const canDelete = hasPermission("Client", "delete");
  const canView = hasPermission("Client", "read");
  const showActionColumn = canDelete;
  const showStatusColumn = canUpdate;
  const HeaderData = [
    "No",
    "Phone Number",
    // "Status",
    ...(showStatusColumn ? ["Status"] : []),
    // Action,
    ...(showActionColumn ? ["Action"] : []),
  ];

  const listData = ClientTableData(userListData, selectedPage, size);

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
            hasPermission("Client", "delete") ? onDeleteHandler : undefined
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
