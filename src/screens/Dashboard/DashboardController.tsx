import { useEffect, useState } from "react";
import { GuideList, SplashList, UpdateSplashA, VideoUpload } from "./Dashboard";
import DashboardComponent from "./DashboardComponent";
import { ButtonLoading } from "../../components";

function DashboardController() {
  const [isLoading, setIsLoading] = useState(false);
  const [splashListData, setSplashListData] = useState<any>("");
  const [openResetPop, setOpenResetPop] = useState(false);
  const [guideText, setGuideText] = useState("");
  const [screenKey, setScreenKey] = useState("");
  const [guideVideo, setGuideVideo] = useState<any>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useEffect(() => {
    setScreenKey("Account");
    fetchData();
    fetchVideo();
  }, []);

  const fetchData = async () => {
    const notificationResponse: any = await SplashList(setIsLoading);
    setSplashListData(notificationResponse?.data?.screen);
  };

  const fetchVideo = async () => {
    const videoResponse: any = await GuideList("Account", setIsLoading);
    console.log(videoResponse?.data?.guides[0]?.guide_video);
    const video = videoResponse?.data?.guides[0]?.guide_video;
    setGuideVideo(video);
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

  const onChangeGuideVideo = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setGuideVideo({
        preview: URL.createObjectURL(file),
        raw: file,
      });
    }
  };

  const uploadGuideVideoHandler = async () => {
    if (!screenKey || !guideVideo?.raw) {
      alert("Please fill all fields and upload a video");
      return;
    }

    const response = await VideoUpload(
      guideText,
      screenKey,
      guideVideo.raw,
      setIsVideoLoading
    );

    if (response?.status === 200) {
      // Optional: clear form
      setGuideText("");
      setScreenKey("");
      setGuideVideo(null);
      fetchVideo();
    }
  };

  return (
    <div>
      <DashboardComponent
        onChangeSplash={onChangeSplash}
        isLoading={isLoading}
        UpdateSplashImageHandler={UpdateSplashImageHandler}
        splashListData={splashListData}
        setSplashListData={setSplashListData}
        toggleResetPop={toggleResetPop}
        guideText={guideText}
        setGuideText={setGuideText}
        screenKey={screenKey}
        setScreenKey={setScreenKey}
        guideVideo={guideVideo}
        setGuideVideo={setGuideVideo}
        onChangeGuideVideo={onChangeGuideVideo}
        uploadGuideVideoHandler={uploadGuideVideoHandler}
        isVideoLoading={isVideoLoading}
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
