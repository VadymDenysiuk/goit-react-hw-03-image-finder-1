import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ModalContent, ModalOverlay } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscClick);
  }

  onEscClick = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <ModalOverlay onClick={this.onOverlayClick}>
        <ModalContent>{children}</ModalContent>
      </ModalOverlay>,
      modalRoot
    );
  }
}
