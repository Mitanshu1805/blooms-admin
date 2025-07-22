import {
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import { FeedbackTableData } from "./FeedbackTableData";
import { hasPermission } from "../../utils/permissions.utils";

interface FeedbackProps {
  selectedPage: number;
  feedbackListData: any;
  isLoading: boolean;
  onDeleteHandler: (value: any) => void;
  setSelectedPage: (value: number) => void;
  size: number;
  setSize: (value: any) => void;
  searchInput: string;
  handleChangeSearch: (value: string) => void;
  handleSwitchChange: (value: any) => void;
}

function FeedbackComponent({
  selectedPage,
  feedbackListData,
  isLoading,
  onDeleteHandler,
  setSelectedPage,
  size,
  setSize,
  searchInput,
  handleChangeSearch,
  handleSwitchChange,
}: FeedbackProps) {
  const canUpdate = hasPermission("feedback", "update");
  const canDelete = hasPermission("feedback", "delete");
  const canView = hasPermission("feedback", "read");
  const showActionColumn = canDelete;
  const showReviewerColumn = canUpdate;
  const HeaderData = [
    "No",
    "Feedback",
    "Rating",
    "Customer Phone",
    ...(showReviewerColumn ? ["Reviewer"] : []),
    // "Reviewer",
    "Posted At",
    // "Action",
    ...(showActionColumn ? ["Action"] : []),
  ];

  const listData = FeedbackTableData(feedbackListData, selectedPage, size);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">FEEDBACK LIST</span>
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
          <SearchBar onChange={handleChangeSearch} value={searchInput} />
        </div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={HeaderData}
          listData={listData}
          onDeleteHandler={
            hasPermission("feedback", "delete") ? onDeleteHandler : undefined
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
            totalCount={feedbackListData?.totalPages ?? 1}
            onPageChange={(page: number) => setSelectedPage(page)}
            itemsPerPage={4}
          />
        </div>
      ) : null}
    </div>
  );
}

export default FeedbackComponent;
