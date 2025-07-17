import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <BeatLoader size={10} color="#ffffff" loading={true} />
    </div>
  );
};

export default LoadingSpinner;
