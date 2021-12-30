import React, { Component } from "react";

export default class Button extends Component {
  state = { disabled: this.props.loading };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      this.setState({ disabled: this.props.loading });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <button
        type="button"
        className="Button"
        disabled={disabled}
        onClick={this.props.onClick}
      >
        Load more
      </button>
    );
  }
}
