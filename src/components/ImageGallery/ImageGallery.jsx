import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageList } from 'components/shared/ImageList/ImageList';
import { Loader } from 'components/shared/Loader/Loader';
import fetchRequest from 'components/services/FetchApi';
import Modal from 'components/shared/Modal/Modal';
import { Div, LoadMode } from './imageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchImages: '',
    page: 1,
    modalOpen: false,
    modalContent: {
      urlLarge: '',
      title: '',
    },
  };
  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchImages } = this.props;
    if (page > prevState.page) {
      this.fetchImages(searchImages, page);
      return;
    }
    if (prevProps.searchImages !== searchImages && page === prevState.page) {
      this.fetchImages(searchImages, 1);
      this.setState({ page: 1 });
      return;
    }
  }
  async fetchImages(currentName, currentPage) {
    this.setState({ loading: true });
    try {
      const result = await fetchRequest(currentName, currentPage);
      const items = result.hits;
      if (items.length === 0) {
        return toast.warn(
          "We didn't find your request, please try again later"
        );
      }
      if (currentPage === 1) {
        this.setState(() => {
          return {
            images: [...items],
          };
        });
      } else {
        this.setState(({ images }) => {
          return {
            images: [...images, ...items],
          };
        });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };
  openModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: {
        urlLarge: '',
        title: '',
      },
    });
  };
  render() {
    const { loading, images, modalOpen, error } = this.state;
    const isImages = Boolean(images.length);
    const { loadMore, closeModal, openModal } = this;
    return (
      <div>
        {error && <p>Try later.</p>}
        <Div> {loading && <Loader />}</Div>

        {isImages && <ImageList items={images} onClick={openModal} />}
        {isImages && <LoadMode onClick={loadMore}>loadMore</LoadMode>}
        {modalOpen && (
          <Modal onClose={closeModal} contents={this.state.modalContent} />
        )}
      </div>
    );
  }
}
