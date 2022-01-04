import React, { Component } from 'react';
import { GlobalStyle } from './styles/GlobalStyles';
import './styles/App.css';
import toast, { Toaster } from 'react-hot-toast';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import Modal from './components/modal/Modal';
import SearchBar from './components/searchBar/SearchBar';
import { Api } from './servises/apiServices';
import not_found_img_url from './images/broken.png';
import ImageGallery from './components/imageGallery/ImageGallery';
import Button from './components/button/Button';
import Loader from './components/loader/Loader';
import Error from './components/error/Error';
import ScrollToTop from 'react-scroll-to-top';
import ModalImage from './components/modalImage/ModalImage';

const api = new Api(not_found_img_url);

export default class App extends Component {
  state = {
    showModal: false,
    query: null,
    galleryItems: [],
    page: 1,
    loading: false,
    error: null,
    modalContent: null,
  };

  breakPoints = {
    response: 479,
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  };

  totalHits = null;
  itemToScroll = null;

  componentDidUpdate(prevProps, prevState) {
    const { showModal, query, page, galleryItems } = this.state;

    if (prevState.query !== query) {
      this.setState({ galleryItems: [] });
    }

    if ((prevState.query !== query && query) || prevState.page !== page) {
      this.fetchGalleryItems();
      return;
    }

    if (prevState.showModal !== showModal && !showModal) {
      this.setState({ modalContent: null });
    }

    if (prevState.galleryItems !== galleryItems && page > 1) {
      document.getElementById(this.itemToScroll)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  fetchGalleryItems = async () => {
    this.totalHits = null;
    const { query, page, galleryItems } = this.state;
    this.setState({ loading: true });
    try {
      const data = await api.fetchPictures(query, page);

      if (!data.hits.length) {
        toast('not found photos');
        this.setState({ galleryItems: [], query: null });
        return;
      }

      this.totalHits = data.totalHits;
      this.itemToScroll = data.hits[0].id;

      const normalizeData = api.getNormalizeData(data, page);

      this.setState({
        galleryItems:
          page === 1 ? normalizeData : [...galleryItems, ...normalizeData],
      });
    } catch (error) {
      this.setState({ error });
      toast.error('Somesing went whrong');
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleModal = () => this.setState(prev => ({ showModal: !prev.showModal }));

  getQuery = query => this.setState({ query, page: 1 });

  getmodalContent = galleryItem => this.setState({ modalContent: galleryItem });

  onLoadMoreClick = () => this.setState(({ page }) => ({ page: page + 1 }));

  render() {
    const {
      query,
      showModal,
      galleryItems,
      loading,
      error,
      modalContent,
      page,
    } = this.state;

    const isLastPage = api.countTotalResults(page) > this.totalHits;

    return (
      <>
        <GlobalStyle />

        <div className="App">
          <SearchBar getQuery={this.getQuery} query={query} />

          {error && <Error errorMsg={error.message} />}

          {!!galleryItems.length && (
            <>
              <ImageGallery
                items={galleryItems}
                onOpen={this.toggleModal}
                getItemId={this.getmodalContent}
              />
              <ScrollToTop
                smooth
                top="300"
                style={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                }}
                component={
                  <BsFillArrowUpCircleFill size="2em" color="#cccccc" />
                }
              />
            </>
          )}

          {loading ? (
            <Loader />
          ) : (
            !isLastPage && <Button onClick={this.onLoadMoreClick} />
          )}
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ModalImage data={modalContent} />
          </Modal>
        )}

        <Toaster
          toastOptions={{
            position: 'bottom-left',
            style: {
              borderRadius: '10px',
              background: '#000000',
              color: '#fff',
            },
          }}
        />
      </>
    );
  }
}
