import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ReactSwitch from "react-switch";
import { DeleteIcon, EditIcon, Eye, Cash } from "../../assets";
import Image from "../Image/Image";
import LotiFiles from "../Loading/LotiFiles/LotiFiles";
import TableLoader from "../Loading/TableLoading";
import "./Table.scss";

const TableComponent = ({
  onHistoryHandler,
  onEditOurselves,
  listData,
  listHeaderData,
  onDeleteHandler,
  onEditHandler,
  isLoading,
  handleChange,
  onDetailsViewHandler,
  isView,
  isViewPayment,
  navigationClick,
  paymentNavigate,
  onBlockHandler,
  isPointsRedeem,
  pointsRedeem,
  isEditMode = false,
  onCellChange,
  onTimeSlotClick,
  showTimeSlotTable,
}: // editItem,
any) => {
  // console.log("editItem in perm table data >>>", editItem);

  const EDITABLE_TITLES = [
    "Fee",
    "Cash/Cashless",
    "Customer",
    "Order ID",
    "Waiver",
  ];

  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          {listData?.length > 0 && listHeaderData ? (
            <div className="table-main-div">
              <Table>
                <Thead>
                  <Tr>
                    {Object.values(listHeaderData).map((j: any, i) => (
                      <Th>{j}</Th>
                    ))}
                  </Tr>
                </Thead>
                {Object.entries(listData).map(([key, value]: any) => (
                  <>
                    <Tbody>
                      <Tr>
                        {Object.values(value).map((j: any, i) =>
                          j.title === "Action" ? (
                            <Td>
                              <div className="content-middle-action-data-div">
                                {onEditHandler ? (
                                  <Image
                                    style={{ paddingLeft: "10px" }}
                                    src={EditIcon}
                                    onClick={() => onEditHandler(j.data)}
                                  />
                                ) : null}

                                {onBlockHandler ? (
                                  <button
                                    onClick={() => onBlockHandler(j.data)}
                                    className={`btn btn-sm ms-2 ${
                                      j.data?.blocked_at
                                        ? "btn-secondary"
                                        : "btn-danger"
                                    }`}
                                    style={{
                                      fontSize: "12px",
                                      padding: "2px 8px",
                                      borderRadius: "4px",
                                      color: "white",
                                    }}
                                  >
                                    {j.data?.blocked_at ? "Unblock" : "Block"}
                                  </button>
                                ) : null}

                                {onDeleteHandler ? (
                                  <>
                                    {j.data.order_status !== "Complete" ? (
                                      <Image
                                        style={{ paddingLeft: "10px" }}
                                        src={DeleteIcon}
                                        onClick={() => onDeleteHandler(j.data)}
                                      />
                                    ) : null}
                                  </>
                                ) : null}
                                {isView ? (
                                  <Image
                                    style={{ paddingLeft: "15px" }}
                                    src={Eye}
                                    onClick={() => {
                                      navigationClick
                                        ? navigationClick(j)
                                        : onDetailsViewHandler(j.data);
                                    }}
                                  />
                                ) : null}
                                {isViewPayment ? (
                                  <Image
                                    style={{ paddingLeft: "10px" }}
                                    src={Cash}
                                    onClick={() => paymentNavigate(j)}
                                  />
                                ) : null}
                                {isPointsRedeem ? (
                                  <Image
                                    style={{ paddingLeft: "10px" }}
                                    src={Cash}
                                    onClick={() => pointsRedeem(j)}
                                  />
                                ) : null}
                              </div>
                            </Td>
                          ) : j.title === "Is Active" ? (
                            <Td className="content-middle-active-data">
                              <ReactSwitch
                                height={25}
                                width={53}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                checked={j.data?.is_active}
                                onChange={(val) =>
                                  handleChange({
                                    id:
                                      j?.data?.crew_id ??
                                      j?.data?.client_id ??
                                      j?.data?.user_id ??
                                      j?.data?.feedback_id ??
                                      j?.data?.option_id ??
                                      j?.data?.property_type_id ??
                                      j?.data?.offer_id,
                                    status: val,
                                  })
                                }
                              />
                            </Td>
                          ) : j.title === "Logo" ? (
                            <Td>
                              <Image
                                className="table-business-logo"
                                src={j?.data}
                              />
                            </Td>
                          ) : j.title === "Navigate" ? (
                            <Td onClick={() => navigationClick(j)}>
                              <div className="navigate-text">
                                {(j.data?.service_name ?? j.data?.location_name)
                                  ? (j.data?.service_name ??
                                    j.data?.location_name)
                                  : "-"}
                              </div>
                            </Td>
                          ) : j.title === "Block History" ? (
                            <Td>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() =>
                                  onHistoryHandler && onHistoryHandler(j.data)
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  fontSize: "12px",
                                  padding: "3px 8px",
                                  borderRadius: "4px",
                                  color: "white",
                                  borderColor: "#FD8F82",
                                  backgroundColor: "#FD8F82",
                                  marginLeft: "8px",
                                }}
                              >
                                <i
                                  className="fa fa-history"
                                  aria-hidden="true"
                                ></i>
                                History
                              </button>
                            </Td>
                          ) : j.title === "Special Service" ? (
                            <Td>
                              {j?.data?.map((name: any) => (
                                <>
                                  {name.service_name ? (
                                    <div>{name.service_name},</div>
                                  ) : (
                                    <div>-</div>
                                  )}
                                </>
                              ))}
                            </Td>
                          ) : (
                            <Td key={i}>
                              {/* ✅ 1️⃣ TIME SLOT CLICK HANDLER */}
                              {j.clickable ? (
                                <span
                                  style={{
                                    cursor: "pointer",
                                    color: "#0d6efd",
                                    textDecoration: "underline",
                                  }}
                                  onClick={() =>
                                    onTimeSlotClick &&
                                    onTimeSlotClick(j.orderId)
                                  }
                                >
                                  {j.data}
                                </span>
                              ) : /* ✅ 2️⃣ EDIT MODE HANDLING */
                              isEditMode && j.editable ? (
                                j.title === "Cash/Cashless" ? (
                                  <select
                                    className="form-select form-select-sm"
                                    value={j.data ?? ""}
                                    onChange={(e) =>
                                      onCellChange &&
                                      onCellChange(
                                        Number(key),
                                        j.title,
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <option value="cash">cash</option>
                                    <option value="cashless">cashless</option>
                                  </select>
                                ) : j.title === "Waiver" ? (
                                  <select
                                    className="form-select form-select-sm"
                                    value={String(j.data)}
                                    onChange={(e) =>
                                      onCellChange &&
                                      onCellChange(
                                        Number(key),
                                        j.title,
                                        e.target.value === "true",
                                      )
                                    }
                                  >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                  </select>
                                ) : (
                                  <input
                                    type={j.title === "Fee" ? "number" : "text"}
                                    className="form-control form-control-sm"
                                    value={j.data ?? ""}
                                    onChange={(e) =>
                                      onCellChange &&
                                      onCellChange(
                                        Number(key),
                                        j.title,
                                        e.target.value,
                                      )
                                    }
                                  />
                                )
                              ) : /* ✅ 3️⃣ BOOLEAN DISPLAY */
                              j.type === "boolean" ? (
                                j.data ? (
                                  "Yes"
                                ) : (
                                  "No"
                                )
                              ) : /* ✅ 4️⃣ NORMAL DISPLAY */
                              j.data || j.data === 0 ? (
                                j.data
                              ) : (
                                "-"
                              )}
                            </Td>
                          ),
                        )}
                      </Tr>
                    </Tbody>
                  </>
                ))}
              </Table>
            </div>
          ) : (
            <LotiFiles message={"No Data Found!"} />
          )}
        </>
      )}
    </>
  );
};

export default TableComponent;
