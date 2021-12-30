import React, { Component } from "react";
import { BsSearch } from "react-icons/bs";
import toast from "react-hot-toast";

export default class SearchBar extends Component {
  state = {
    searchQuery: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const normalizeQuery = this.getNormalizeQuery();
    if (!normalizeQuery) {
      toast("Empty query");
      return;
    }

    this.props.getQuery(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  getNormalizeQuery = () => {
    return this.state.searchQuery.toLowerCase().trim();
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch color="#55555" />
          </button>

          <input
            onChange={this.handleChange}
            className="SearchForm-input"
            type="text"
            value={searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

// {
//   /* <form class="search-form" id="search-form">
//   <label class="input-container">
//     <input
//       class="search-form__input"
//       type="text"
//       name="query"
//       autocomplete="off"
//       placeholder="Search images..."
//     />
//     <span class="search-form__spinner"></span>
//   </label>
//   <button class="search-form__btn" type="submit" data-btn="search">
//     Find it
//   </button>
// </form>; */
// }
