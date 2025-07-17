import { Image, Button } from "../..";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

function CrewDetails({ crewDetails, toggleCrewDetailsPopup, center }: any) {
  const componentRef: any = useRef();

  const personalData = [
    { label: "Name :", title: crewDetails.crew_name },
    { label: "Phone Number :", title: crewDetails.phone_number },
    { label: "Address :", title: crewDetails.address },
    {
      label: "Start Work Date :",
      title: new Date(crewDetails.preferred_start_work_date).toLocaleString(),
    },
    {
      label: "Preferred Work Territory :",
      title: crewDetails.preferred_work_territory,
    },
    {
      label: "Specialized Services :",
      title: crewDetails?.services?.map(
        (name: any) => name?.service_name + ", "
      ),
    },
  ];

  const documentData = [
    { label: "Work Vehicle Photo", title: crewDetails.work_vehicle_photo },
    {
      label: "Certificate Credentials",
      title: crewDetails.certificate_credentials,
    },
    { label: "Company Information", title: crewDetails.company_information },
  ];

  const libraries: any = ["places"];
  const mapContainerStyle = {
    width: "80%",
    height: "400px",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const printDocument = () => {
    window.print();
  };

  const renderItem = () => {
    return (
      <>
        <div className="personal">
          <h4>Personal Details</h4>
          <div className="flex-row-a-cen-j-around">
            <div className="portrait-img">
              <Image
                src={crewDetails.applicant_personal_portrait}
                alt="Personal Portrait"
              />
            </div>
            <div className="flex-col-div">
              {personalData?.map((item, index) => (
                <p key={index}>
                  <strong>{item?.label} </strong> {item?.title}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="documents">
          <h4>Documents</h4>
          <div className="doc-div">
            {documentData?.map((item, index) => (
              <div className="flex-col-a-cen-div document" key={index}>
                <Image src={item?.title} />
                <strong>({item?.label})</strong>{" "}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="crew-box-main">
        <div className="crew-box">
          <div className="resume-container">
            <div className="header">
              <h3>CREW DETAILS</h3>
            </div>
            <div className="underline" />
            <div className="crew-details-scroll">
              {renderItem()}
              <div
                className="add-details-input-rows"
                style={{ marginTop: "3rem" }}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={10}
                  center={center}
                >
                  <MarkerF
                    position={center}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                  />
                </GoogleMap>
              </div>
            </div>
            <div className="underline" />
            <div className="flex-row-cen-cen-div">
              <ReactToPrint
                trigger={() => (
                  <Button
                    className="add-details-submit-btn"
                    onClick={printDocument}
                    name="Print"
                  />
                )}
                content={() => componentRef.current}
                removeAfterPrint={true}
              />
              <Button
                className="add-details-cancel-btn"
                name="Cancel"
                onClick={toggleCrewDetailsPopup}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={componentRef} className="print-version">
        <div className="header">
          <h1>CREW DETAILS</h1>
        </div>
        <div className="underline" />
        {renderItem()}
        <div className="underline" style={{ marginTop: "2rem" }} />
      </div>
    </>
  );
}

export default CrewDetails;
