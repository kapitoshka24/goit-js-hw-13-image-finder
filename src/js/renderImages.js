import { refs } from "./refs";
import PixabayAPI from "./apiService";
import photosMarkup from "../template/photo-card.hbs";
import imageMarkup from "../template/image.hbs";
import * as basicLightbox from "basiclightbox";
import { newError, newErrorLoad, newInfo, newSuccess } from "./pnotify";

const pixabayAPI = new PixabayAPI();

refs.searchForm.addEventListener("submit", onSubmit);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

function onSubmit(evt) {
  evt.preventDefault();

  if (!refs.searchQuery.value) {
    newError();
    return;
  }

  pixabayAPI.resetPage();
  refs.gallery.innerHTML = "";

  pixabayAPI.query = refs.searchQuery.value;
  pixabayAPI.fetchImages().then(({ hits }) => renderImages(hits));
}

function renderImages(images) {
  if (!images.length) {
    newInfo();
    return;
  }

  refs.gallery.insertAdjacentHTML("beforeend", photosMarkup(images));
  newSuccess();
  refs.gallery.addEventListener("click", openImage);
}

function onLoadMore() {
  if (!refs.searchQuery.value) {
    newErrorLoad();
    return;
  }

  pixabayAPI.fetchImages().then(({ hits }) => {
    renderImages(hits);
    scrollDown();
  });
}

function scrollDown() {
  window.scrollTo({
    top: document.documentElement.scrollTop + window.innerHeight,
    behavior: "smooth",
  });
}

async function openImage(evt) {
  console.dir(evt);

  if (evt.target.nodeName === "IMG") {
    const image = await pixabayAPI
      .fetchImageById(evt.target.id)
      .then(({ hits }) => {
        return hits;
      });

    const instance = basicLightbox.create(imageMarkup(...image));
    instance.show();
  }
}
