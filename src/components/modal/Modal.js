import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalContent, ModalOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
    document.body.style.overflow = '';
  }

  onEscClick = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = e => {
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
      modalRoot,
    );
  }
}
