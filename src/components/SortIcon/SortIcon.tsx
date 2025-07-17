import React from "react";
import { Sort } from "../../assets";
import "./SortIcon.scss";
import Image from "../Image/Image";

const SortIcon = ({ onClick }: any) => {
  return <Image className="sort-icon" src={Sort} onClick={onClick} />;
};

export default SortIcon;
