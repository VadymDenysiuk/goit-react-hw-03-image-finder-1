import React, { Component } from "react";
import { GlobalStyle } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

import colorThemes from "./styles/themes";
import geometry from "./styles/geomerty";
import { spacing } from "./styles/geomerty/spacing";
// import Container from "./components/container/Container";
import Modal from "./components/modal/Modal";
import SearchBar from "./components/searchBar/SearchBar";
import { fetchPictures } from "./servises/apiServices";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import Loader from "./components/loader/Loader";

export default class App extends Component {
  state = {
    title: "dark",
    pageFormat: "desktop",
    showModal: false,
    query: null,
    galleryItems: [],
    page: 1,
    loading: false,
    error: null,
    largeImageURL: null,
  };

  breakPoints = {
    response: 479,
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  };

  componentDidMount() {
    this.onHandleResize();
    window.addEventListener("resize", this.onHandleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ loading: true, galleryItems: [] });

      fetchPictures(this.state.query, this.state.page)
        .then((data) => {
          if (!data.hits.length) {
            toast("not found photos");
            return;
          }
          this.setState({ galleryItems: [...this.getNormalizeData(data)] });
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.showModal !== this.state.showModal && !this.state.showModal) {
      this.setState({ largeImageURL: null });
    }

    if (prevState.page !== this.state.page) {
      this.setState({ loading: true });

      fetchPictures(this.state.query, this.state.page)
        .then((data) =>
          this.setState(({ galleryItems }) => ({
            galleryItems: [...galleryItems, ...this.getNormalizeData(data)],
          }))
        )
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onHandleResize);
  }

  getNormalizeData = ({ hits }) =>
    hits.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));

  // switch state.pageFormat / response / mobile / tablet / desktop
  onHandleResize = () => {
    const { mobile, tablet, desktop } = this.breakPoints;
    const { pageFormat } = this.state;
    const viewPort = window.innerWidth;

    if (viewPort < mobile && pageFormat !== "response") {
      this.setState({ pageFormat: "response" });
      return;
    }
    if (viewPort >= mobile && viewPort < tablet && pageFormat !== "mobile") {
      this.setState({ pageFormat: "mobile" });
      return;
    }
    if (viewPort >= tablet && viewPort < desktop && pageFormat !== "tablet") {
      this.setState({ pageFormat: "tablet" });
      return;
    }
    if (viewPort >= desktop && pageFormat !== "desktop") {
      this.setState({ pageFormat: "desktop" });
      return;
    }
  };

  toggleModal = () => {
    this.setState((prev) => ({
      showModal: !prev.showModal,
    }));
  };

  getQuery = (query) => {
    this.setState({ query, page: 1 });
  };

  getLargeImage = (largeImageURL) => {
    console.log(largeImageURL);
    this.setState({ largeImageURL });
  };

  onLoadMoreClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const {
      query,
      title,
      pageFormat,
      showModal,
      galleryItems,
      loading,
      error,
      largeImageURL,
    } = this.state;

    return (
      <ThemeProvider
        theme={{ ...colorThemes[title], ...geometry[pageFormat], spacing }}
      >
        <GlobalStyle />

        <div className="App">
          <SearchBar getQuery={this.getQuery} query={query} />

          {error && <div>{error.message}</div>}
          {galleryItems.length > 0 ? (
            <>
              <ImageGallery
                items={galleryItems}
                onOpen={this.toggleModal}
                getLargeImage={this.getLargeImage}
              />
              {!loading ? (
                <Button onClick={this.onLoadMoreClick} loading={loading} />
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
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        <div>
          <Toaster
            toastOptions={{
              position: "top-right",
              style: {
                borderRadius: "10px",
                background: "#236d44",
                color: "#fff",
              },
            }}
          />
        </div>
      </ThemeProvider>
    );
  }
}
