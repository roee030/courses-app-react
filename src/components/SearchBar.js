import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import "./SearchBar.css";
const SearchPage = () => {
  return (
    <div className="SearchBar">
    <MDBCol md="6">
      <div className="input-group md-form form-sm form-1 pl-0 ">
        <div className="input-group-prepend">
          <span className="input-group-text  lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search For Course" aria-label="Search" />
      </div>
    </MDBCol>
    </div>
  );
}

export default SearchPage;