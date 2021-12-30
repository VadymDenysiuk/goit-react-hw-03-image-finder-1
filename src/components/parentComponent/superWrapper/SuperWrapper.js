import React, { Component } from "react";
import PropTypes from "prop-types";
import { SuWrapp } from "./SuperWrapper.styled";

export default class SuperWrapper extends Component {
  state = {
    animation: { ...this.props.animation.start },
  };

  componentDidMount() {
    this.showWrapper();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isShow !== prevProps.isShow) {
      if (this.props.isShow) {
        this.showWrapper();
        return;
      }
      this.hideWrapper();
    }
  }

  showWrapper = () => {
    const { def } = this.props.animation;
    setTimeout(() => {
      this.setState({
        animation: { ...def },
      });
    }, 0);
  };

  hideWrapper = () => {
    const { end } = this.props.animation;
    setTimeout(() => {
      this.setState({
        animation: { ...end },
      });
    }, 0);
  };

  render() {
    const { animation } = this.state;
    const { delay } = this.props.animation;
    const { children } = this.props;
    return (
      <SuWrapp animation={animation} delay={delay}>
        {children}
      </SuWrapp>
    );
  }
}

SuperWrapper.propTypes = {
  animation: PropTypes.object.isRequired,
  isShow: PropTypes.bool.isRequired,
};
