import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { NotificationTableData } from "./NotificationTableData";
import { hasPermission } from "../../utils/permissions.utils";

interface NotificationProps {
  selectedPage: number;
  notificationListData: any;
  isLoading: boolean;
  onDeleteHandler: (value: any) => void;
  toggleCrewPopup: () => void;
  setSelectedPage: (value: number) => void;
  size: number;
  setSize: (value: any) => void;
  searchInput: string;
  handleChangeSearch: (value: string) => void;
}

function NotificationComponent({
  selectedPage,
  notificationListData,
  isLoading,
  onDeleteHandler,
  toggleCrewPopup,
  setSelectedPage,
  size,
  setSize,
  searchInput,
  handleChangeSearch,
}: NotificationProps) {
  const canUpdate = hasPermission("Notification", "update");
  const canDelete = hasPermission("Notification", "delete");
  const canView = hasPermission("Notification", "read");
  const showActionColumn = canDelete || canUpdate;
  const HeaderData = ["No", "Title", "Context", "CreatedAt", "Action"];

  const listData = NotificationTableData(
    notificationListData,
    selectedPage,
    size
  );

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">NOTIFICATION LIST</span>
          <div className="details-list-top-left-dropdown">
            <NumberDropdown
              data={size}
              onChange={(e: any) => {
                setSize(e.target.value);
                setSelectedPage(1);
              }}
            />
          </div>
        </div>
        <div className="details-list-top-right">
          {hasPermission("Notification", "write") && (
            <Button
              className="not-details-list-btn"
              name={"Send Notification"}
              onClick={toggleCrewPopup}
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
          onDeleteHandler={
            hasPermission("Notification", "delete")
              ? onDeleteHandler
              : undefined
          }
        />
      </div>
      {listData?.length > 0 ? (
        <div className="details-list-pagination">
          <Pagination
            selectedPage={selectedPage}
            totalCount={notificationListData?.totalPages ?? 1}
            onPageChange={(page: number) => setSelectedPage(page)}
            itemsPerPage={4}
          />
        </div>
      ) : null}
    </div>
  );
}

export default NotificationComponent;
