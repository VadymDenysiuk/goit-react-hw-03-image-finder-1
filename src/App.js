import React, { Component } from "react";
import { GlobalStyle } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { Toaster } from "react-hot-toast";

import colorThemes from "./styles/themes";
import geometry from "./styles/geomerty";
import { spacing } from "./styles/geomerty/spacing";
// import Container from "./components/container/Container";
import Modal from "./components/modal/Modal";
import SearchBar from "./components/searchBar/SearchBar";
import { fetchPictures } from "./servises/apiServices";
import ImageGallery from "./components/imageGallery/ImageGallery";

export default class App extends Component {
  state = {
    title: "dark",
    pageFormat: "desktop",
    showModal: false,
    query: null,
    galleryItems: null,
    page: 1,
    loading: false,
    error: null,
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
      this.setState({ loading: true });

      fetchPictures(this.state.query, this.state.page)
        .then((data) => {
          console.log(data);
          this.setState(({ page, loading }) => ({
            page: page + 1,
            loading: !loading,
          }));
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onHandleResize);
  }

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
    this.setState((prev) => ({ showModal: !prev.showModal }));
  };

  getQuery = (query) => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { title, pageFormat, showModal, galleryItems, loading, error } =
      this.state;
    return (
      <ThemeProvider
        theme={{ ...colorThemes[title], ...geometry[pageFormat], spacing }}
      >
        <GlobalStyle />

        <div className="App">
          <SearchBar getQuery={this.getQuery} />
          <button type="button" onClick={this.toggleModal}>
            OPEN MODAL
          </button>
          {error && <div>{error.message}</div>}
          {loading && <div>ГРУЗИМ</div>}
          {galleryItems && <ImageGallery items={galleryItems} />}
        </div>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <button type="button" onClick={this.toggleModal}>
              CLOSE MODAL
            </button>
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
