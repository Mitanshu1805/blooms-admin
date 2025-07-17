import React from "react";
import { SearchIcon } from "../../assets";
import "./SearchBar.scss";
import Image from "../Image/Image";

function SearchBar({ onChange, value }: any) {
  return (
    <div className="content-top-right-searchbar">
      <div className="content-searchBar">
        <Image className="content-searchBar-search" src={SearchIcon} />
        <input
          className="content-searchBar-input"
          placeholder="Search"
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}

export default SearchBar;
