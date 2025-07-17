import React from "react";
import "./DeletePopup.scss";
import { RedCrossIcon } from "../../assets";
import { ButtonLoading, Image } from "..";

interface DeletePopupProps {
  name?: any;
  DeleteSubmitHandler: any;
  CancelDeleteSubmitHandler: () => void;
  category?: string;
  isLoading?: boolean;
  logout?: string;
}

function DeletePopup({
  name,
  DeleteSubmitHandler,
  CancelDeleteSubmitHandler,
  category,
  isLoading,
  logout,
}: DeletePopupProps) {
  return (
    <div className="deleteCustomer-box-main">
      <div className="deleteCustomer-box">
        <div className="del-pop">
          <div className="del-pop-main">
            <Image className="del-pop-icon" src={RedCrossIcon} />
          </div>
          <div className="del-pop-text-div">
            {logout ? (
              <span className="del-pop-text">{logout} ?</span>
            ) : (
              <span className="del-pop-text">
                Are you sure want to Delete {category} : <br />
                {name} ?
              </span>
            )}
          </div>
          <div className="del-pop-btn">
            <button className="del-pop-btn-yes" onClick={DeleteSubmitHandler}>
              {isLoading ? <ButtonLoading /> : "Yes"}
            </button>
            <button
              className="del-pop-btn-no"
              onClick={CancelDeleteSubmitHandler}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
