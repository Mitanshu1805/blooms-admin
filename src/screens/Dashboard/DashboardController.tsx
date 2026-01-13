import { useEffect, useState } from "react";
import {
  GuideList,
  SplashList,
  UpdateSplashA,
  VideoDelete,
  VideoUpload,
} from "./Dashboard";
import DashboardComponent from "./DashboardComponent";
import { ButtonLoading } from "../../components";
import { OfferScreen } from "../Offers/OffersApis";

function DashboardController() {
  const [isLoading, setIsLoading] = useState(false);
  const [splashListData, setSplashListData] = useState<any>("");
  const [openResetPop, setOpenResetPop] = useState(false);
  const [guideText, setGuideText] = useState("");
  const [screenKey, setScreenKey] = useState("");
  const [guideVideo, setGuideVideo] = useState<any>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [offerScreensList, setOfferScreenList] = useState<any>();

  useEffect(() => {
    setScreenKey("Account");
    fetchData();
    fetchScreens();
  }, []);

  useEffect(() => {
    fetchVideo(screenKey);
  }, [screenKey]);

  const fetchData = async () => {
    const notificationResponse: any = await SplashList(setIsLoading);
    setSplashListData(notificationResponse?.data?.screen);
  };

  const fetchScreens = async () => {
    const screenResponse: any = await OfferScreen(setIsLoading);
    // console.log(screenResponse?.data?.screens);
    setOfferScreenList(screenResponse?.data?.screens);
  };

  // const fetchVideo = async (key: string) => {
  //   if (!key) return;

  //   const videoResponse: any = await GuideList(key, setIsLoading);
  //   const video = videoResponse?.data?.guides?.[0]?.guide_video || null;
  //   setGuideVideo(video);
  // };

  const fetchVideo = async (key: string) => {
    if (!key) return;

    const videoResponse: any = await GuideList(key, setIsLoading);
    const guide = videoResponse?.data?.guides?.[0] || null;

    setGuideVideo(guide); // ⬅️ store full object
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

  // const onChangeGuideVideo = (e: any) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     setGuideVideo({
  //       preview: URL.createObjectURL(file),
  //       raw: file,
  //     });
  //   }
  // };
  const onChangeGuideVideo = (e: any) => {
    // 🟢 File upload event
    if (e?.target?.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setGuideVideo({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      return;
    }

    // 🟢 YouTube link (string)
    if (typeof e === "string") {
      setGuideVideo(e.trim());
    }
  };

  // const uploadGuideVideoHandler = async () => {
  //   if (!screenKey || !guideVideo?.raw) {
  //     alert("Please fill all fields and upload a video");
  //     return;
  //   }

  //   const response = await VideoUpload(
  //     guideText,
  //     screenKey,
  //     guideVideo.raw,
  //     setIsVideoLoading
  //   );

  //   if (response?.status === 200) {
  //     // Optional: clear form
  //     setGuideText("");
  //     // setScreenKey("");
  //     setGuideVideo(null);
  //     fetchVideo(screenKey);
  //   }
  // };

  const uploadGuideVideoHandler = async () => {
    if (!screenKey || !guideVideo) {
      alert("Please fill all fields");
      return;
    }

    let response;

    // 🟢 YouTube link
    if (typeof guideVideo === "string") {
      response = await VideoUpload(
        guideText,
        screenKey,
        guideVideo,
        setIsVideoLoading
      );
    }
    // 🟢 New uploaded file
    else if (guideVideo?.raw) {
      response = await VideoUpload(
        guideText,
        screenKey,
        guideVideo.raw,
        setIsVideoLoading
      );
    }
    // 🟢 Existing saved video (API fetch)
    else if (guideVideo?.guide_video) {
      response = await VideoUpload(
        guideText,
        screenKey,
        guideVideo.guide_video,
        setIsVideoLoading
      );
    } else {
      alert("Invalid guide video");
      return;
    }

    if (response?.status === 200) {
      setGuideText("");
      setGuideVideo(null);
      fetchVideo(screenKey);
    }
  };

  const deleteGuideVideoHandler = async () => {
    console.log("HERE ");
    console.log(guideVideo);

    // if (!guideVideo?.guide_id) return;

    const response = await VideoDelete(guideVideo.guide_id, setIsVideoLoading);

    if (response?.status === 200) {
      setGuideVideo(null);
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
        offerScreensList={offerScreensList}
        deleteGuideVideoHandler={deleteGuideVideoHandler}
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
