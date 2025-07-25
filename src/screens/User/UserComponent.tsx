import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { UserTableData } from "./UserTableData";
import { hasPermission } from "../../utils/permissions.utils";

interface UserProps {
  selectedPage: number;
  userListData: any;
  isLoading: boolean;
  onEditHandler: (value: any) => void;
  onEditOurselves: (value: any) => void;
  onDeleteHandler: (value: any) => void;
  toggleUserPopup: () => void;
  setSelectedPage: (value: number) => void;
  limit: number;
  setLimit: (value: any) => void;
  handleChangeSearch: (value: string) => void;
  handleSwitchChange: (value: any) => void;
  searchInput: string;
}

function UserComponent({
  onEditOurselves,
  selectedPage,
  userListData,
  isLoading,
  onEditHandler,
  onDeleteHandler,
  toggleUserPopup,
  setSelectedPage,
  limit,
  setLimit,
  handleChangeSearch,
  searchInput,
  handleSwitchChange,
}: UserProps) {
  const canUpdate = hasPermission("user", "update");
  const canDelete = hasPermission("user", "delete");
  const canView = hasPermission("user", "read");
  const showActionColumn = canDelete || canUpdate;
  const HeaderData = [
    "No",
    "First Name",
    "Last Name",
    "Phone Number",
    "Role",
    // "Status",

    "Date Of Birth",
    "Employee Type",
    "Service Type",
    ...(canUpdate ? ["Status"] : []),
    ...(showActionColumn ? ["Action"] : []),
    // "Action",
  ];

  const listData = UserTableData(userListData, selectedPage, limit);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">USER LIST</span>
          <div className="details-list-top-left-dropdown">
            <NumberDropdown
              data={limit}
              onChange={(e: any) => {
                setLimit(e.target.value);
                setSelectedPage(1);
              }}
            />
          </div>
        </div>
        <div className="details-list-top-right">
          {hasPermission("user", "create") && (
            <Button
              className="details-list-btn"
              name={"Add User"}
              onClick={toggleUserPopup}
            />
          )}
          <SearchBar onChange={handleChangeSearch} value={searchInput} />
        </div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={HeaderData}
          listData={listData}
          onEditHandler={
            hasPermission("user", "update") ? onEditHandler : undefined
          }
          onEditOurselves={
            hasPermission("user", "update") ? onEditOurselves : undefined
          }
          onDeleteHandler={
            hasPermission("user", "delete") ? onDeleteHandler : undefined
          }
          // handleChange={(value: any) => handleSwitchChange(value)}
          handleChange={
            hasPermission("user", "update") ? handleSwitchChange : undefined
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

export default UserComponent;
