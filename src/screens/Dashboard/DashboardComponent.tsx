import { useState } from "react";
import { DocIcon, RemoveIcon } from "../../assets";
import { Button, Image, Input, TableLoader } from "../../components";
import "./Dashboard.scss";
import { hasPermission } from "../../utils/permissions.utils";

interface DashboardProps {
  onChangeSplash: (value: any) => void;
  isLoading: boolean;
  UpdateSplashImageHandler: () => void;
  splashListData: any;
  setSplashListData: (value: any) => void;
  toggleResetPop: (value: boolean) => void;
  guideText: string;
  setGuideText: (v: string) => void;
  screenKey: string;
  setScreenKey: (v: string) => void;
  guideVideo: any;
  setGuideVideo: any;
  onChangeGuideVideo: (e: any) => void;
  uploadGuideVideoHandler: () => void;
  isVideoLoading: boolean;
  offerScreensList: any;
  deleteGuideVideoHandler: () => void;
}

function DashboardComponent({
  onChangeSplash,
  isLoading,
  UpdateSplashImageHandler,
  splashListData,
  setSplashListData,
  toggleResetPop,
  guideText,
  setGuideText,
  screenKey,
  setScreenKey,
  guideVideo,
  onChangeGuideVideo,
  uploadGuideVideoHandler,
  isVideoLoading,
  setGuideVideo,
  offerScreensList,
  deleteGuideVideoHandler,
}: DashboardProps) {
  const canUpdate = hasPermission("dashboard", "update");
  const canDelete = hasPermission("dashboard", "delete");
  const canView = hasPermission("dashboard", "read");
  const showActionColumn = canDelete || canUpdate;
  console.log(guideVideo);
  const [videoMode, setVideoMode] = useState<"file" | "youtube">("file");

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }
  const isYoutubeUrl = (url: string) =>
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);

  console.log("offerScreensList>>>>>", offerScreensList);

  return (
    <div className="dash-list-card card">
      {isLoading ? (
        <TableLoader />
      ) : (
        <div className="dashboard-container">
          <div className="dashboard-sections-wrapper">
            {/* ======================== SPLASH IMAGE SECTION ======================== */}
            <div className="dashboard-section">
              <label className="input-label">Splash Image</label>
              {splashListData?.screen_image ? (
                <div className="flex-col-cen-cen-div dash-splash-selected-img-div">
                  <Image
                    src={
                      splashListData?.screen_image?.preview
                        ? splashListData?.screen_image?.preview
                        : splashListData?.screen_image
                    }
                    className="flex-col-cen-cen-div dash-splash-selected-img-div"
                  />
                  <div
                    className="splash-edit"
                    onClick={() => {
                      splashListData?.screen_image
                        ? setSplashListData((prevState: any) => ({
                            ...prevState,
                            screen_image: null,
                          }))
                        : setSplashListData((prevState: any) => ({
                            ...prevState,
                            screen_image: {
                              preview: null,
                              raw: null,
                            },
                          }));
                    }}
                  >
                    <Image src={RemoveIcon} />
                  </div>
                </div>
              ) : (
                <div className="flex-col-cen-cen-div dash-splash-img-div">
                  <label className="doc-img">
                    <Image src={DocIcon} />
                    <input
                      id="files"
                      style={{ visibility: "hidden" }}
                      accept="image/*"
                      type="file"
                      onChange={onChangeSplash}
                    />
                  </label>
                  <span className="doc-title">Upload Splash Image</span>
                  <span className="doc-sub">
                    You can only upload png and jpeg format
                  </span>
                </div>
              )}

              <div className="dashboard-input-btn-div">
                <Input
                  label="Splash Duration"
                  type="number"
                  placeholder="Splash Duration"
                  value={splashListData?.screen_number}
                  onChange={(e: any) => {
                    setSplashListData((prevValue: any) => ({
                      ...prevValue,
                      screen_number: e.target.value,
                    }));
                  }}
                />
                <div className="flex-row">
                  {hasPermission("dashboard", "update") && (
                    <Button
                      className="info-edit-btn"
                      name="Update"
                      style={{ backgroundColor: "#fd8f82" }}
                      isLoading={isLoading}
                      onClick={UpdateSplashImageHandler}
                    />
                  )}
                  {hasPermission("dashboard", "delete") && (
                    <Button
                      className="info-reset-btn"
                      name="Reset"
                      onClick={toggleResetPop}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ======================== GUIDE VIDEO SECTION ======================== */}
            <div className="dashboard-section">
              <label className="input-label">Guide Video</label>

              {/* 🔀 MODE TOGGLE */}
              <div className="flex-row gap-2 mb-2">
                <Button
                  name="Upload Video"
                  className={
                    videoMode === "file" ? "btn-primary" : "btn-outline"
                  }
                  style={
                    videoMode === "file"
                      ? {
                          backgroundColor: "#fd8f82",
                          borderColor: "#fd8f82",
                          marginRight: "5rem",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                        }
                      : {
                          marginRight: "5rem",
                        }
                  }
                  onClick={() => {
                    setVideoMode("file");
                    setGuideVideo(null);
                  }}
                />

                <Button
                  name="YouTube Link"
                  className={
                    videoMode === "youtube" ? "btn-primary" : "btn-outline"
                  }
                  style={
                    videoMode === "youtube"
                      ? {
                          backgroundColor: "#fd8f82",
                          borderColor: "#fd8f82",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                        }
                      : {}
                  }
                  onClick={() => {
                    setVideoMode("youtube");
                    setGuideVideo("");
                  }}
                />
              </div>

              {/* 🔵 PREVIEW EXISTING VIDEO */}
              {guideVideo && videoMode === "file" && (
                <div className="flex-col-cen-cen-div dash-splash-selected-img-div">
                  <video
                    src={guideVideo.preview || guideVideo.guide_video}
                    className="dash-media-preview"
                    controls
                  />
                  <div
                    className="splash-edit"
                    // onClick={deleteGuideVideoHandler}
                    onClick={() => setGuideVideo(null)}
                  >
                    <Image src={RemoveIcon} />
                  </div>
                </div>
              )}

              {guideVideo &&
                videoMode === "youtube" &&
                (typeof guideVideo === "string"
                  ? isYoutubeUrl(guideVideo)
                  : isYoutubeUrl(guideVideo?.youtube_url)) && (
                  <div className="flex-col-cen-cen-div dash-splash-selected-img-div">
                    <a
                      href={
                        typeof guideVideo === "string"
                          ? guideVideo
                          : guideVideo.youtube_url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      ▶ Watch on YouTube
                    </a>
                    <div
                      className="splash-edit"
                      onClick={() => setGuideVideo(null)}
                    >
                      <Image src={RemoveIcon} />
                    </div>
                  </div>
                )}

              {/* 🔵 FILE UPLOAD */}
              {videoMode === "file" && !guideVideo && (
                <div className="flex-col-cen-cen-div dash-splash-img-div">
                  <label className="doc-img">
                    <Image src={DocIcon} />
                    <input
                      style={{ visibility: "hidden" }}
                      type="file"
                      accept="video/*"
                      onChange={onChangeGuideVideo}
                    />
                  </label>
                  <span className="doc-title">Upload Guide Video</span>
                  <span className="doc-sub">MP4 / WebM only</span>
                </div>
              )}

              {/* 🔵 YOUTUBE INPUT */}
              {videoMode === "youtube" && (
                <Input
                  label="YouTube Video Link"
                  type="text"
                  placeholder="https://youtube.com/..."
                  value={
                    videoMode === "youtube"
                      ? typeof guideVideo === "string"
                        ? guideVideo // local YouTube input
                        : guideVideo?.youtube_url || "" // backend YouTube video
                      : ""
                  }
                  onChange={(e: any) => setGuideVideo(e.target.value)}
                />
              )}

              {/* GUIDE TEXT */}
              <Input
                label="Guide Text"
                type="text"
                placeholder="Enter guide text"
                value={guideText}
                onChange={(e: any) => setGuideText(e.target.value)}
              />

              {/* SCREEN KEY */}
              {offerScreensList?.length > 0 && (
                <div
                  className="input-group"
                  style={{ flexDirection: "column" }}
                >
                  <label className="input-label">Screen Key</label>
                  <select
                    className="form-control"
                    style={{ width: "53%" }}
                    value={screenKey}
                    onChange={(e) => setScreenKey(e.target.value)}
                  >
                    <option value="">Select Screen</option>
                    {offerScreensList.map((offer: any) => (
                      <option key={offer.screen_key} value={offer.screen_key}>
                        {offer.screen_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button
                className="info-edit-btn"
                style={{ backgroundColor: "#fd8f82" }}
                name="Upload"
                isLoading={isVideoLoading}
                onClick={uploadGuideVideoHandler}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardComponent;
