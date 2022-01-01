import React, { Component } from "react";
import { GlobalStyle } from "./styles/GlobalStyles";
import "./styles/App.css";
import toast, { Toaster } from "react-hot-toast";

import Modal from "./components/modal/Modal";
import SearchBar from "./components/searchBar/SearchBar";
import { Api } from "./servises/apiServices";
import not_found_img_url from "./images/broken.png";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import Loader from "./components/loader/Loader";
import Error from "./components/error/Error";

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
  firstFindItemId = null;

  componentDidUpdate(prevProps, prevState) {
    const { showModal, query, page, galleryItems } = this.state;

    if (prevState.query !== query) {
      this.setState({ loading: true, galleryItems: [], page: 1 });
      this.totalHits = null;

      api
        .fetchPictures(query, page)
        .then((data) => {
          if (!data.hits.length) {
            toast("not found photos");
            return;
          }
          this.totalHits = data.totalHits;
          this.setState({
            galleryItems: [...api.getNormalizeData(data, page)],
          });
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.showModal !== showModal && !showModal) {
      this.setState({ modalContent: null });
    }

    if (prevState.page !== page) {
      this.setState({ loading: true });
      api
        .fetchPictures(query, page)
        .then((data) => {
          this.firstFindItemId = data.hits[0].id;
          this.setState(({ galleryItems }) => ({
            galleryItems: [
              ...galleryItems,
              ...api.getNormalizeData(data, page),
            ],
          }));
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.galleryItems !== galleryItems) {
      document.getElementById(this.firstFindItemId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  toggleModal = () => this.setState((prev) => ({ showModal: !prev.showModal }));

  getQuery = (query) => this.setState({ query });

  getmodalContent = (itemId) =>
    this.setState({ modalContent: this.getFilteredItem(itemId) });

  getFilteredItem = (itemId) =>
    this.state.galleryItems.filter((item) => item.id === itemId)[0];

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
          {galleryItems.length > 0 ? (
            <>
              <ImageGallery
                items={galleryItems}
                onOpen={this.toggleModal}
                getItemId={this.getmodalContent}
              />
              {!loading ? (
                !isLastPage && <Button onClick={this.onLoadMoreClick} />
              ) : (
                <Loader />
              )}
            </>
          ) : (
            loading && <Loader />
          )}
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} />
          </Modal>
        )}

        <Toaster
          toastOptions={{
            position: "bottom-left",
            style: {
              borderRadius: "10px",
              background: "#000000",
              color: "#fff",
            },
          }}
        />
      </>
    );
  }
}
