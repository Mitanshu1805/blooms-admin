import { DocIcon, RedCrossIcon } from "../../../assets";
import Button from "../../Button/Button";
import Image from "../../Image/Image";

function UploadMultipleFiles({
  isLoading,
  toggleMultiFile,
  files,
  setFiles,
  handleUploadMultipleFilesSubmit,
}: any) {
  const handleFileChange = (event: any, index: number) => {
    const newFiles = Array.from(event.target.files);
    const updatedFiles: any = [...files];
    updatedFiles[index] = newFiles[0];
    setFiles(updatedFiles);
  };

  const handleAddInput = () => {
    setFiles([...files, null]);
  };

  const handleRemoveInput = (index: number) => {
    const updatedFiles = files.filter((_: any, i: any) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">UPLOAD MULTIPLE FILES</span>
        </div>
        <div className="underline" />
        <div className="add-details-container">
          <div className="add-details-input-rows">
            <div className="upload-multi-file-div">
              {files.map((file: any, index: number) => (
                <div key={index} className="only-padding">
                  <label className="input-label">Upload File</label>
                  {file === null ? (
                    <div className="flex-col-cen-cen-div add-doc">
                      <label className="doc-img">
                        <Image src={DocIcon} alt="Doc Icon" />
                        <input
                          id={`file-${index}`}
                          style={{ visibility: "hidden" }}
                          accept="image/*,.pdf"
                          type="file"
                          onChange={(event) => handleFileChange(event, index)}
                        />
                      </label>
                      <span className="doc-title">Upload File</span>
                      <span className="doc-sub">
                        You can only upload png, jpeg, or pdf format
                      </span>
                    </div>
                  ) : (
                    <div className="flex-col-cen-cen-div selected-img">
                      {file.type.startsWith("image/") ? (
                        <>
                          <Image
                            className="flex-col-cen-cen-div selected-img"
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                          />
                          <div
                            className="edit"
                            onClick={() => handleRemoveInput(index)}
                          >
                            <Image src={RedCrossIcon} alt="Remove Icon" />
                          </div>
                        </>
                      ) : file.type === "application/pdf" ? (
                        <>
                          <embed
                            src={URL.createObjectURL(file)}
                            type="application/pdf"
                            width="200"
                            height="200"
                          />
                          <div
                            className="edit"
                            onClick={() => handleRemoveInput(index)}
                          >
                            <Image src={RedCrossIcon} alt="Remove Icon" />
                          </div>
                        </>
                      ) : (
                        <p>{file.name}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div
                className="flex-row-cen-cen-div"
                style={{ marginTop: "1rem" }}
              >
                <Button
                  className="order-info-submit-btn"
                  name="Add File"
                  onClick={handleAddInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={handleUploadMultipleFilesSubmit}
          />
          <Button
            isLoading={false}
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleMultiFile}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadMultipleFiles;
