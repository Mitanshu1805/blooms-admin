import { useEffect, useState } from "react";
import { SplashList, UpdateSplashA } from "./Dashboard";
import DashboardComponent from "./DashboardComponent";
import { ButtonLoading } from "../../components";

function DashboardController() {
  const [isLoading, setIsLoading] = useState(false);
  const [splashListData, setSplashListData] = useState<any>("");
  const [openResetPop, setOpenResetPop] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const notificationResponse: any = await SplashList(setIsLoading);
    setSplashListData(notificationResponse?.data?.screen);
  };

  const UpdateSplashImageHandler = async () => {
    if (splashListData?.screen_number && splashListData?.screen_image) {
      const response = await UpdateSplashA(
        splashListData?.screen_number,
        splashListData?.screen_image,
        setIsLoading
      );
      if (response?.status === 200) {
        fetchData();
      }
    }
  };

  const onChangeSplash = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const newSplashListData = {
        ...splashListData,
        screen_image: {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
        },
        screen_number: splashListData?.screen_number,
      };
      setSplashListData(newSplashListData);
    }
  };

  const toggleResetPop = () => {
    setOpenResetPop(!openResetPop);
  };

  const resetSubmitHandler = () => {};

  return (
    <div>
      <DashboardComponent
        onChangeSplash={onChangeSplash}
        isLoading={isLoading}
        UpdateSplashImageHandler={UpdateSplashImageHandler}
        splashListData={splashListData}
        setSplashListData={setSplashListData}
        toggleResetPop={toggleResetPop}
      />
      {openResetPop ? (
        <div className="deleteCustomer-box-main">
          <div className="deleteCustomer-box">
            <div className="del-pop">
              <div className="del-pop-main">
                <i
                  className="bx bx-reset"
                  style={{ fontSize: "50px", color: "red" }}
                ></i>
              </div>
              <div className="del-pop-text-div">
                <span className="del-pop-text">
                  Are you sure want to Reset setting?
                </span>
              </div>
              <div className="del-pop-btn">
                <button
                  className="del-pop-btn-yes"
                  onClick={resetSubmitHandler}
                >
                  {isLoading ? <ButtonLoading /> : "Yes"}
                </button>
                <button className="del-pop-btn-no" onClick={toggleResetPop}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DashboardController;
