import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

interface PaginationProps {
  totalCount: number;
  onPageChange: (page: number) => void;
  selectedPage?: any;
  itemsPerPage?: any;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  onPageChange,
  selectedPage,
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={
          <div className="icon-div">
            <i className="bx bx-left-arrow-alt prev-icon" />
            <span>Previous</span>
          </div>
        }
        nextLabel={
          <div className="icon-div">
            <span>Next</span>
            <i className="bx bx-right-arrow-alt next-icon" />
          </div>
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={selectedPage - 1}
      />
    </div>
  );
};

export default Pagination;
