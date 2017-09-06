import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleTermChange}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
