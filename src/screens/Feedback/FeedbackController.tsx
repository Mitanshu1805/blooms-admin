import { useEffect, useState } from "react";
import { DeletePopup } from "../../components";
import { DeleteFeedback, FeedbackList, updateFeedbackStatus } from "./Feedback";
import FeedbackComponent from "./FeedbackComponent";

function FeedbackController() {
  const [feedbackListData, setFeedbackListData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteFeedbackPop, setOpenDeleteFeedbackPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [selectedPage, limit, searchInput]);

  const fetchData = async () => {
    const feedbackResponse: any = await FeedbackList(
      selectedPage,
      limit,
      searchInput,
      setIsLoading
    );
    setFeedbackListData(feedbackResponse?.data);
  };

  const DeleteFeedbackApi = async () => {
    const response = await DeleteFeedback(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const toggleDeletePopup = () => {
    setOpenDeleteFeedbackPop(!openDeleteFeedbackPop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteFeedbackApi();
    toggleDeletePopup();
  };

  const handleSwitchChange = async (value: any) => {
    const response = await updateFeedbackStatus(value, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <FeedbackComponent
        feedbackListData={feedbackListData}
        isLoading={isLoading}
        onDeleteHandler={onDeleteHandler}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={limit}
        setSize={setLimit}
        handleChangeSearch={handleChangeSearch}
        searchInput={searchInput}
        handleSwitchChange={handleSwitchChange}
      />
      {openDeleteFeedbackPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Feedback"}
          name={deleteItem?.feedback}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default FeedbackController;
