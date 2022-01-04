export class Api {
  #API_KEY = '24136877-bceaa9033dc460acdc4ccde64';
  #BASE_API_URL = 'https://pixabay.com/api/';

  constructor(notFoundImageUrl) {
    this.per_page = 12;
    this.orientation = 'horizontal';
    this.image_type = 'photo';
    this._imageNotFoundLink = notFoundImageUrl;
  }

  fetchPictures = async (query, page = 1) => {
    const urlParams = new URLSearchParams({
      key: this.#API_KEY,
      image_type: this.image_type,
      orientation: this.orientation,
      q: query,
      page,
      per_page: this.per_page,
    });

    const res = await fetch(`${this.#BASE_API_URL}?${urlParams}`); // await
    return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
  };

  countTotalResults = page => page * this.per_page;

  getNormalizeData = ({ hits }) => {
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
          tags,
        };
      },
    );
    return normalizeHits;
  };
}
