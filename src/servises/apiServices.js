const API_KEY = "24136877-bceaa9033dc460acdc4ccde64";
const BASE_API_URL = "https://pixabay.com/api/";
const options = {
  orientation: "horizontal",
  image_type: "photo",
  per_page: 12,
};

export const fetchPictures = async (query, page = 1) => {
  try {
    const urlParams = new URLSearchParams({
      key: API_KEY,
      q: query,
      page,
      ...options,
    });

    const res = await fetch(`${BASE_API_URL}?${urlParams}`); // await
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`${query} is not found`));
  } catch (error) {
    console.log("Ошибка", error);
    return error;
  }
};

export class ApiService {
  #API_KEY = "24136877-bceaa9033dc460acdc4ccde64";
  #BASE_API_URL = "https://pixabay.com/api/";

  constructor(not_fnd_img_url) {
    this.query = "";
    this.page = 1;
    this.per_page = 12;
    this.orientation = "horizontal";
    this.image_type = "photo";
    this.resultsCounter = null;
    this._imageNotFoundLink = not_fnd_img_url;
  }

  fetchPictures = async (searchQuery) => {
    try {
      this.query = searchQuery;

      const urlParams = new URLSearchParams({
        image_type: this.image_type,
        orientation: this.orientation,
        q: this.query,
        page: this.page,
        per_page: this.per_page,
        key: this.#API_KEY,
      });

      const res = await fetch(`${this.#BASE_API_URL}?${urlParams}`); // await
      if (res.ok) {
        return res.json();
      }
      return Promise.reject({
        title: res.status,
        message: res.statusText,
      });
    } catch (error) {
      return Promise.reject({
        title: error.message,
      });
    }
  };

  fetchByID = async (id) => {
    const urlParams = new URLSearchParams({
      id,
      key: this.#API_KEY,
    });
    try {
      const res = await fetch(`${this.#BASE_API_URL}?${urlParams}`); // await
      if (res.ok) {
        return res.json();
      }
      return Promise.reject({
        title: res.status,
        message: res.statusText,
      });
    } catch (error) {
      return Promise.reject({
        title: error.message,
      });
    }
  };

  incrementPage = () => {
    this.page += 1;
  };

  resetPage = () => {
    this.page = 1;
  };

  countTotalResults = () => {
    this.resultsCounter = this.page * this.per_page;
  };

  getNormalizeData = (data) => {
    const results = data.hits;

    const normalizeHits = results.map((result) => {
      const imageUrl = result.webformatURL
        ? result.webformatURL
        : this._imageNotFoundLink;
      return {
        ...result,
        page: this.page,
        webformatURL: imageUrl,
      };
    });
    return {
      ...data,
      hits: normalizeHits,
    };
  };
}
