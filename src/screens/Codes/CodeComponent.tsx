import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { CodeTableData } from "./CodeTableData";
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
  handleChangeSearch: (value: string) => void;
}

function CodeComponent({
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
}: RolesProps) {
  const canUpdate = hasPermission("discount_codes", "update");
  const canDelete = hasPermission("discount_codes", "delete");
  const canView = hasPermission("discount_codes", "read");
  const showActionColumn = canDelete || canUpdate;
  const HeaderData = [
    "No",
    "Name",
    "Discount Code",
    "Quantity",
    "Discount Value",
    "Discount Type",
    "Start Date",
    "End Date",
    // "Action",
    ...(showActionColumn ? ["Action"] : []),
  ];

  const listData = CodeTableData(userListData, selectedPage, size);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">
            DISCOUNT CODE LIST
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
          {hasPermission("discount_codes", "create") && (
            <Button
              className="details-list-btn"
              name={"Add Code"}
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
            hasPermission("discount_codes", "update")
              ? onEditHandler
              : undefined
          }
          onDeleteHandler={
            hasPermission("discount_codes", "delete")
              ? onDeleteHandler
              : undefined
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

export default CodeComponent;
