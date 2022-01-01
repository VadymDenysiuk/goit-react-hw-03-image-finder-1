// const API_KEY = "24136877-bceaa9033dc460acdc4ccde64";
// const BASE_API_URL = "https://pixabay.com/api/";
// const options = {
//   orientation: "horizontal",
//   image_type: "photo",
//   per_page: 12,
// };

// export const fetchPictures = async (query, page = 1) => {
//   try {
//     const urlParams = new URLSearchParams({
//       key: API_KEY,
//       q: query,
//       page,
//       ...options,
//     });

//     const res = await fetch(`${BASE_API_URL}?${urlParams}`); // await
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(new Error(`${query} is not found`));
//   } catch (error) {
//     console.log("Ошибка", error);
//     return error;
//   }
// };

export class Api {
  #API_KEY = "24136877-bceaa9033dc460acdc4ccde64";
  #BASE_API_URL = "https://pixabay.com/api/";

  constructor(not_fnd_img_url) {
    this.per_page = 12;
    this.orientation = "horizontal";
    this.image_type = "photo";
    this._imageNotFoundLink = not_fnd_img_url;
  }

  fetchPictures = async (query, page = 1) => {
    try {
      const urlParams = new URLSearchParams({
        key: this.#API_KEY,
        image_type: this.image_type,
        orientation: this.orientation,
        q: query,
        page,
        per_page: this.per_page,
      });

      const res = await fetch(`${this.#BASE_API_URL}?${urlParams}`); // await
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`${query} is not found`));
    } catch (error) {
      console.log("Ошибка", error);
      return error;
    }
  };

  countTotalResults = (page) => page * this.per_page;

  getNormalizeData = ({ hits }, page) => {
    const normalizeHits = hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => {
        const imageUrl = webformatURL ? webformatURL : this._imageNotFoundLink;
        const largeimageUrl = largeImageURL
          ? largeImageURL
          : this._imageNotFoundLink;
        return {
          id,
          webformatURL: imageUrl,
          largeImageURL: largeimageUrl,
          page,
          tags,
        };
      }
    );
    return normalizeHits;
  };
}
