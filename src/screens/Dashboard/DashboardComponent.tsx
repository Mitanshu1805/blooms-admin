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
}: DashboardProps) {
  const canUpdate = hasPermission("dashboard", "update");
  const canDelete = hasPermission("dashboard", "delete");
  const canView = hasPermission("dashboard", "read");
  const showActionColumn = canDelete || canUpdate;
  console.log(guideVideo);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

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

              {guideVideo ? (
                <div className="flex-col-cen-cen-div dash-splash-selected-img-div">
                  <video
                    src={guideVideo.preview || guideVideo}
                    className="flex-col-cen-cen-div dash-media-preview"
                    controls
                  />

                  <div
                    className="splash-edit"
                    onClick={() => setGuideVideo(null)}
                  >
                    <Image src={RemoveIcon} />
                  </div>
                </div>
              ) : (
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
                  <span className="doc-sub">
                    Only MP4 & WebM formats allowed
                  </span>
                </div>
              )}

              <Input
                label="Guide Text"
                type="text"
                placeholder="Enter guide text"
                value={guideText}
                onChange={(e: any) => setGuideText(e.target.value)}
              />

              <Input label="Screen Key" type="text" value="Account" disabled />

              <Button
                className="info-edit-btn"
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
