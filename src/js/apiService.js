const API_KEY = "21315741-9bacfcacd69aafd45f00bd411";
const BASE_URL = "https://pixabay.com/api/";

export default class PixabayAPI {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async fetchImages() {
    const response = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
    );
    const images = await response.json();

    this.incrementPage();

    return images;
  }

  async fetchImageById(id) {
    const response = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&id=${id}&page=${this.page}&per_page=12&key=${API_KEY}`
    );
    const image = await response.json();

    return image;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }
}
