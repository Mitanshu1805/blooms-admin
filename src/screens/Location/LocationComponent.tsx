import { useNavigate } from "react-router-dom";
import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { LocationTableData } from "./LocationTableData";
import { hasPermission } from "../../utils/permissions.utils";

interface LocationProps {
  selectedPage: number;
  crewListData: any;
  isLoading: boolean;
  onEditHandler: (value: any) => void;
  onDeleteHandler: (value: any) => void;
  toggleCrewPopup: () => void;
  setSelectedPage: (value: number) => void;
  size: number;
  setSize: (value: any) => void;
  searchInput: string;
  handleChangeSearch: (value: string) => void;
}

function LocationComponent({
  selectedPage,
  crewListData,
  isLoading,
  onEditHandler,
  onDeleteHandler,
  toggleCrewPopup,
  setSelectedPage,
  size,
  setSize,
  searchInput,
  handleChangeSearch,
}: LocationProps) {
  const canUpdate = hasPermission("territories", "update");
  const canDelete = hasPermission("territories", "delete");
  const canView = hasPermission("territories", "read");
  const showActionColumn = canDelete || canUpdate;
  const navigation = useNavigate();
  const HeaderData = [
    "No",
    "Territory Image",
    "Territory",
    "Template Name",
    "Currency",
    "Share Count",
    // "Action",
    ...(showActionColumn ? ["Action"] : []),
  ];

  const listData = LocationTableData(crewListData, selectedPage, size);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">TERRITORIES LIST</span>
          <div className="details-list-top-left-dropdown">
            <NumberDropdown
              data={crewListData}
              onChange={(e: any) => {
                setSize(e.target.value);
                setSelectedPage(1);
              }}
            />
          </div>
        </div>
        <div className="details-list-top-right">
          {hasPermission("territories", "create") && (
            <Button
              className="details-list-btn"
              name={"Add Territory"}
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
          onEditHandler={
            hasPermission("territories", "update") ? onEditHandler : undefined
          }
          onDeleteHandler={
            hasPermission("territories", "delete") ? onDeleteHandler : undefined
          }
          navigationClick={(value: any) =>
            navigation("/territories/services", {
              state: value,
            })
          }
        />
      </div>
      {listData?.length > 0 ? (
        <div className="details-list-pagination">
          <Pagination
            selectedPage={selectedPage}
            totalCount={crewListData?.totalPages ?? 1}
            onPageChange={(page: number) => setSelectedPage(page)}
            itemsPerPage={4}
          />
        </div>
      ) : null}
    </div>
  );
}

export default LocationComponent;
