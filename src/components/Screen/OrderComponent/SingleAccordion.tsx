import React from "react";
import { Eye, RedCrossIcon } from "../../../assets";
import LotiFiles from "../../Loading/LotiFiles/LotiFiles";
import Accordion from "../../Accordion/Accordion";
import Image from "../../Image/Image";

function SingleAccordion({
  name,
  active,
  onClick,
  item,
  label,
  toggleOrderDetailsPopup,
}: any) {
  return (
    <div>
      <Accordion
        name={name}
        active={active}
        isActive={true}
        onClick={onClick}
        content={
          <div className="flex-col-div card-class">
            {item ? (
              <div className="image-pdf-wrap">
                <div
                  className="flex-col-cen-cen-div selected-img"
                  style={{
                    margin: ".5rem",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {item?.endsWith(".pdf") || item?.endsWith(".PDF") ? (
                    <>
                      <embed src={item} type="application/pdf" width="100%" />
                      <div
                        className="edit"
                        onClick={() => toggleOrderDetailsPopup(item, label)}
                      >
                        <Image src={RedCrossIcon} />
                      </div>
                    </>
                  ) : (
                    <>
                      <Image
                        src={item}
                        className="flex-col-cen-cen-div selected-img"
                        alt={`Image`}
                      />

                      <div
                        className="edit"
                        style={{
                          marginLeft: "-3rem",
                        }}
                        onClick={() => {
                          window.open(item, "_blank");
                        }}
                      >
                        <Image src={Eye} />
                      </div>
                      <div
                        className="edit"
                        style={{ marginLeft: "3rem" }}
                        onClick={() => toggleOrderDetailsPopup(item, label)}
                      >
                        <Image src={RedCrossIcon} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <LotiFiles message={"No Data Found!"} />
            )}
          </div>
        }
      />
    </div>
  );
}

export default SingleAccordion;
