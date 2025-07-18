import {
  Button,
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import "./Crew.scss";
import { CrewTableData } from "./CrewTableData";
import { hasPermission } from "../../utils/permissions.utils";

interface CrewProps {
  selectedPage: number;
  onEditHandler: (value: any) => void;
  crewListData: any;
  onDeleteHandler: (value: any) => void;
  isLoading: boolean;
  toggleCrewPopup: () => void;
  size: number;
  handleSwitchChange: (value: any) => void;
  searchInput: string;
  onDetailsViewHandler: (value: any) => void;
  setSelectedPage: (value: number) => void;
  setSize: (value: any) => void;
  handleChangeSearch: (value: string) => void;
  navigation: any;
}

function CrewComponent({
  selectedPage,
  onEditHandler,
  crewListData,
  onDeleteHandler,
  isLoading,
  toggleCrewPopup,
  size,
  handleSwitchChange,
  searchInput,
  onDetailsViewHandler,
  setSelectedPage,
  setSize,
  handleChangeSearch,
  navigation,
}: CrewProps) {
  const canUpdate = hasPermission("Crew", "update");
  const canDelete = hasPermission("Crew", "delete");
  const canView = hasPermission("Crew", "read");
  const showActionColumn = canDelete || canUpdate;
  const HeaderData = [
    "No",
    "Name",
    "Phone Number",
    "Status",
    "Preferred Location",
    "Special Service",
    "Start Work Date",
    "Address",
    ...(showActionColumn ? ["Action"] : []),
    // "Action",
  ];

  const listData = CrewTableData(crewListData, selectedPage, size);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">CREW LIST</span>
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
          {hasPermission("Crew", "write") && (
            <Button
              className="details-list-btn"
              name={"Add Crew"}
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
            hasPermission("Crew", "update") ? onEditHandler : undefined
          }
          onDeleteHandler={
            hasPermission("Crew", "delete") ? onDeleteHandler : undefined
          }
          handleChange={(value: any) => handleSwitchChange(value)}
          isView={true}
          isViewPayment={true}
          onDetailsViewHandler={(value: any) => onDetailsViewHandler(value)}
          paymentNavigate={(value: any) =>
            navigation("/crew/orders", {
              state: value?.data,
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

export default CrewComponent;
