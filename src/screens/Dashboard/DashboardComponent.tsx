import { DocIcon, RemoveIcon } from "../../assets";
import { Button, Image, Input, TableLoader } from "../../components";
import "./Dashboard.scss";

interface DashboardProps {
  onChangeSplash: (value: any) => void;
  isLoading: boolean;
  UpdateSplashImageHandler: () => void;
  splashListData: any;
  setSplashListData: (value: any) => void;
  toggleResetPop: (value: boolean) => void;
}

function DashboardComponent({
  onChangeSplash,
  isLoading,
  UpdateSplashImageHandler,
  splashListData,
  setSplashListData,
  toggleResetPop,
}: DashboardProps) {
  return (
    <div className="dash-list-card card">
      {isLoading ? (
        <TableLoader />
      ) : (
        <div className="dashboard-container">
          <div>
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
          </div>
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
            <div className="flex-row-cen-cen-div">
              <Button
                className="info-edit-btn"
                name="Update"
                isLoading={isLoading}
                onClick={UpdateSplashImageHandler}
              />
              <Button
                className="info-reset-btn"
                name="Reset"
                onClick={toggleResetPop}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardComponent;
