import {
  NumberDropdown,
  Pagination,
  SearchBar,
  TableComp,
} from "../../components";
import "./Order.scss";
import { OrderTableData } from "./OrderTableData";

interface OrderProps {
  selectedPage: number;
  userListData: any;
  isLoading: boolean;
  onDeleteHandler: (value: any) => void;
  setSelectedPage: (value: number) => void;
  size: number;
  setSize: (value: any) => void;
  searchInput: string;
  handleChangeSearch: (value: string) => void;
  navigation: any;
}

function OrderComponent({
  selectedPage,
  userListData,
  isLoading,
  onDeleteHandler,
  setSelectedPage,
  size,
  setSize,
  searchInput,
  handleChangeSearch,
  navigation,
}: OrderProps) {
  const HeaderData = [
    "No",
    "Location Name",
    "Service Name",
    "Client Name",
    "Order ID",
    "City",
    "Payment Method",
    "Status",
    "Code",
    "Time Slot",
    "Action",
  ];

  const listData = OrderTableData(userListData, selectedPage, size);

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">ORDER LIST</span>
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
          onDeleteHandler={(value: any) => onDeleteHandler(value)}
          navigationClick={(value: any) =>
            navigation("/orders/details", {
              state: value,
            })
          }
          isView={true}
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

export default OrderComponent;
