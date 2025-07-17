import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "./LotiFiles.scss";
import { EmptyTable } from "../../../assets";

const LotiFiles = ({ message }: any) => {
  return (
    <div className="container" style={{ marginBottom: "80px" }}>
      <Player src={EmptyTable} className="empty-table" loop autoplay />
      <span className="empty-table-title">{message}</span>
    </div>
  );
};

export default LotiFiles;
