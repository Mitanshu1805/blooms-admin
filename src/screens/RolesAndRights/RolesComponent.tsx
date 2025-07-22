import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { RolesTableData } from "./RolesTableData";
import { hasPermission } from "../../utils/permissions.utils";

interface RolesProps {
  selectedPage: number;
  userListData: any;
  isLoading: boolean;
  onEditHandler: (value: any) => void;
  onDeleteHandler: (value: any) => void;
  toggleUserPopup: () => void;
  setSelectedPage: (value: number) => void;
  size: number;
  setSize: (value: any) => void;
  searchInput: string;
  onClose: () => void;
  handleChangeSearch: (value: string) => void;
}

function RolesComponent({
  selectedPage,
  userListData,
  isLoading,
  onEditHandler,
  onDeleteHandler,
  toggleUserPopup,
  setSelectedPage,
  size,
  setSize,
  searchInput,
  handleChangeSearch,
  onClose,
}: RolesProps) {
  const canUpdate = hasPermission("roles", "update");
  const canDelete = hasPermission("roles", "delete");
  const canView = hasPermission("roles", "read");
  const showActionColumn = canDelete || canUpdate;
  const HeaderData = [
    "No",
    "Role Name",
    //  "Actions",
    "Permissions",
    ...(canDelete ? ["Action"] : []),
  ];

  const listData = RolesTableData(userListData, selectedPage, size);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">
            ROLES AND RIGHTS LIST
          </span>
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
          {hasPermission("roles", "create") && (
            <Button
              className="details-list-btn"
              name={"Add Roles"}
              onClick={() => {
                onClose();
                toggleUserPopup();
              }}
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
          // onEditHandler={(value: any) => onEditHandler(value)}

          onDeleteHandler={
            hasPermission("roles", "delete") ? onDeleteHandler : undefined
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

export default RolesComponent;
