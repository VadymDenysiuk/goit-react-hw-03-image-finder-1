import React, { Component } from "react";
import Btn from "./Btn";
import SuperWrapper from "./superWrapper/SuperWrapper";

const options = {
  delay: 500,
  custom: {
    start: {
      opacity: 0,
      transform: {
        translateX: 0 + "%",
        translateY: 0 + "%",
        scale: 1,
        rotate: 0 + "turn",
        rotateX: 0 + "turn",
        rotateY: 0 + "turn",
      },
    },
    def: {
      opacity: 1,
      transform: {
        translateX: 0 + "%",
        translateY: 0 + "%",
        scale: 1,
        rotate: 0 + "turn",
        rotateX: 0 + "turn",
        rotateY: 0 + "turn",
      },
    },
    end: {
      opacity: 0,
      transform: {
        translateX: 0 + "%",
        translateY: 0 + "%",
        scale: 1,
        rotate: 0 + "turn",
        rotateX: 0 + "turn",
        rotateY: 0 + "turn",
      },
    },
  },
};

export default class ParentComponent extends Component {
  state = {
    isMount: false,
    isShow: false,
  };

  timeoutID = null;

  onButtonClick = (e) => {
    // console.log(this.state.isMount, this.state.isShow, this.state.timeoutID);

    if (this.state.isMount && this.state.isShow) {
      // console.log("Закрытие");
      this.toggleIsShow();
      this.timeoutID = setTimeout(() => {
        this.toggleIsMount();
      }, options.delay);
      return;
    }

    if (this.state.isMount && !this.state.isShow) {
      // console.log("Отмена закрытия");
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
      this.toggleIsShow();
      return;
    }
    // console.log("Открытие");
    this.toggleIsShow();
    this.toggleIsMount();
  };

  toggleIsMount = () => {
    this.setState((prevState) => ({
      isMount: !prevState.isMount,
    }));
  };

  toggleIsShow = () => {
    this.setState((prevState) => ({
      isShow: !prevState.isShow,
    }));
  };

  render() {
    const { isMount, isShow } = this.state;
    return (
      <>
        <Btn onButtonClick={this.onButtonClick} isMount={isMount}>
          Click
        </Btn>
        {isMount && (
          <SuperWrapper
            animation={{ ...options.custom, delay: options.delay }}
            isShow={isShow}
          >
            <Btn onButtonClick={this.onButtonClick} isMount={isMount}>
              Click2
            </Btn>
          </SuperWrapper>
        )}
      </>
    );
  }
}
