import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modals, ImgModal } from './Modal.styled';
const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }
  closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL, imageTitle } = this.props.contents;
    return createPortal(
      <Overlay onClick={this.closeModal}>
        <Modals>
          <ImgModal src={largeImageURL} alt={imageTitle} />
        </Modals>
      </Overlay>,
      modalRoot
    );
  }
}
