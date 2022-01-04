import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BsSearch } from 'react-icons/bs';

import toast from 'react-hot-toast';

export default class SearchBar extends Component {
  static propTypes = {
    query: PropTypes.string,
    getQuery: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const normalizedQuery = this.getNormalizedQuery();
    if (!normalizedQuery) {
      toast('Empty query');
      return;
    }
    if (normalizedQuery === this.props.query) {
      toast('Same query');
      this.setState({ searchQuery: '' });
      return;
    }
    this.props.getQuery(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  getNormalizedQuery = () => {
    return this.state.searchQuery.toLowerCase().trim();
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            className="SearchForm-input"
            type="text"
            value={searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className="SearchForm-button">
            <BsSearch color="#55555" />
          </button>
        </form>
      </header>
    );
  }
}
