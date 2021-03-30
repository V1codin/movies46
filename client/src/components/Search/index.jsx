import React from "react";
import Page from "../../modules/pages/";

import { connect } from "react-redux";

const mStP = (state) => {
  return {
    searchValue: state.movies.search,
  };
};

function Search(props) {
  const { searchValue } = props;

  if (!searchValue) return <h2>There is nothing to search</h2>;

  return (
    <Page requestUrl="/movies/search" type="search" searchValue={searchValue} />
  );
}

export default connect(mStP, null)(Search);
