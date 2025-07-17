import { useEffect, useState } from "react";
import { AddCode, DeletePopup, EditCode } from "../../components";
import { ValidateName } from "../../helpers/Validators";
import { AlertType, alertService } from "../../utils/alert.service";
import { AddCodesA, CodeList, DeleteCode, EditCodeA } from "./CodeApis";
import CodeComponent from "./CodeComponent";

function CodeController() {
  const initialValue = {
    name: "",
    quantity: "",
    discount_type: "",
    discount_value: "",
    discount_code: "",
  };
  const [codeData, setCodeData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [date_start, setDate_start] = useState<any>("");
  const [date_end, setDate_end] = useState<any>("");
  const [codeListData, setCodeListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [openCodeForm, setOpenCodeForm] = useState(false);
  const [openEditCodePop, setOpenEditCodePop] = useState(false);
  const [editItem, setEditItem] = useState<any>("");
  const [openDeleteCodePop, setOpenDeleteCodePop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [size, selectedPage, searchInput]);

  useEffect(() => {
    if (editItem) {
      setDate_start(new Date(editItem?.date_start));
      setDate_end(new Date(editItem?.date_end));
    }
  }, [editItem]);

  const fetchData = async () => {
    const codeDataResponse: any = await CodeList(
      size,
      selectedPage,
      searchInput,
      setIsLoading
    );
    setCodeListData(codeDataResponse?.data);
  };
  const AddCodeApi = async () => {
    const response = await AddCodesA(
      codeData,
      date_start,
      date_end,
      setIsLoading
    );
    if (response?.status === 201) {
      fetchData();
      toggleCodePopup();
    }
  };

  const EditCodeApi = async () => {
    const response = await EditCodeA(
      editItem,
      date_start,
      date_end,
      setIsLoading
    );
    if (response?.status === 200) {
      fetchData();
      toggleEditUserPopup();
    }
  };

  const DeleteCodeApi = async () => {
    const response = await DeleteCode(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleDeletePopup();
    }
  };

  const AddCodeValidator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    const statusName = ValidateName(codeData.name);
    const statusQuantity = ValidateName(codeData.quantity);
    const statusDiscountType = ValidateName(codeData.discount_type);
    const statusDiscountValue = ValidateName(codeData.discount_value);

    if (statusName) {
      newErrors.name = statusName === 1 ? "Discount Code is Required" : "";
      isValid = false;
    }

    if (statusQuantity) {
      newErrors.quantity = statusQuantity === 1 ? "Quantity is Required" : "";
      isValid = false;
    }

    if (statusDiscountType) {
      newErrors.discount_type =
        statusDiscountType === 1 ? "Discount Type is Required" : "";
      isValid = false;
    }

    if (statusDiscountValue) {
      newErrors.discount_value =
        statusDiscountValue === 1 ? "Discount Value is Required" : "";
      isValid = false;
    }
    if (codeData?.discount_code) {
      if (codeData?.discount_code?.length < 8) {
        newErrors.discount_code = "Discount Code must be at least 8 characters";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleCodePopup = () => {
    setOpenCodeForm(!openCodeForm);
    setCodeData(initialValue);
    setErrors(initialValue);
  };

  const CodeFormSubmitHandler = () => {
    if (AddCodeValidator()) {
      AddCodeApi();
    }
  };

  const toggleEditUserPopup = () => {
    setOpenEditCodePop(!openEditCodePop);
  };

  const onEditHandler = (value: any) => {
    setEditItem(value);
    toggleEditUserPopup();
  };

  const RolesEditFormSubmitHandler = () => {
    if (editItem?.discount_code?.length < 8) {
      alertService.alert({
        type: AlertType.Error,
        message: "Minimum 8 characters required",
      });
    } else {
      EditCodeApi();
    }
  };

  const toggleDeletePopup = () => {
    setOpenDeleteCodePop(!openDeleteCodePop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteCodeApi();
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <CodeComponent
        userListData={codeListData}
        isLoading={isLoading}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        toggleUserPopup={toggleCodePopup}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={size}
        setSize={setSize}
        searchInput={searchInput}
        handleChangeSearch={handleChangeSearch}
      />
      {openCodeForm ? (
        <AddCode
          userData={codeData}
          setUserData={setCodeData}
          errors={errors}
          UserFormSubmitHandler={CodeFormSubmitHandler}
          toggleUserPopup={toggleCodePopup}
          isLoading={isLoading}
          date_start={date_start}
          setDate_start={setDate_start}
          date_end={date_end}
          setDate_end={setDate_end}
        />
      ) : null}
      {openEditCodePop ? (
        <EditCode
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserFormSubmitHandler={RolesEditFormSubmitHandler}
          toggleUserPopup={toggleEditUserPopup}
          isLoading={isLoading}
          date_start={date_start}
          setDate_start={setDate_start}
          date_end={date_end}
          setDate_end={setDate_end}
        />
      ) : null}
      {openDeleteCodePop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Code"}
          name={deleteItem?.discount_code}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default CodeController;
