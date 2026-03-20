import { Eye, RedCrossIcon } from "../../../assets";
import Accordion from "../../Accordion/Accordion";
import Image from "../../Image/Image";
import LotiFiles from "../../Loading/LotiFiles/LotiFiles";
import moment from "moment";

const MultiAccordion = ({
  name,
  active,
  onClick,
  item,
  label,
  toggleOrderDetailsPopup,
  showDelete = true,
}: any) => {
  const formatDate = (date: string) => {
    if (!date) return "-";
    return moment.utc(date).local().format("DD MMM YYYY, hh:mm A");
  };
  return (
    <div>
      <Accordion
        name={name}
        active={active}
        isActive={true}
        onClick={onClick}
        content={
          <div className="flex-col-div card-class">
            {item?.length > 0 ? (
              <div className="image-pdf-wrap">
                {item?.map((fileObj: any, index: number) => {
                  // ✅ support both formats
                  const file =
                    typeof fileObj === "string" ? fileObj : fileObj?.quote;

                  const createdAt = fileObj?.quote_created_at;
                  const deletedAt = fileObj?.quote_deleted_at;

                  const isPDF = file?.toLowerCase().includes(".pdf");

                  return (
                    <div key={index}>
                      <div
                        className="flex-col-cen-cen-div selected-img"
                        style={{ margin: "2.5rem 1rem 1rem 0" }}
                      >
                        {isPDF ? (
                          <>
                            <embed
                              src={file}
                              type="application/pdf"
                              width="100%"
                            />

                            {showDelete && (
                              <div
                                className="edit"
                                onClick={() =>
                                  toggleOrderDetailsPopup(file, label)
                                }
                              >
                                <Image src={RedCrossIcon} />
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <Image
                              src={file}
                              className="flex-col-cen-cen-div selected-img"
                              alt={`Image ${index + 1}`}
                            />

                            <div
                              style={{
                                display: "flex",
                                justifyContent: showDelete
                                  ? "space-between"
                                  : "center",
                                alignItems: "center",
                                width: "100%",
                                marginTop: "8px",
                              }}
                            >
                              {/* 👁️ Eye */}
                              <div
                                className="edit"
                                onClick={() => window.open(file, "_blank")}
                              >
                                <Image src={Eye} />
                              </div>

                              {/* ❌ Delete */}
                              {showDelete && (
                                <div
                                  className="edit"
                                  onClick={() =>
                                    toggleOrderDetailsPopup(file, label)
                                  }
                                >
                                  <Image src={RedCrossIcon} />
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        {(createdAt || deletedAt) && (
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              flexWrap: "wrap",
                            }}
                          >
                            {createdAt && (
                              <span className="meta-created">
                                Created: {formatDate(createdAt)}{" "}
                              </span>
                            )}
                            {deletedAt && (
                              <span className="meta-deleted">
                                Deleted: {formatDate(deletedAt)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <LotiFiles message={"No Data Found!"} />
            )}
          </div>
        }
      />
    </div>
  );
};

export default MultiAccordion;
