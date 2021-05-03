import { refs } from "./refs";
import PixabayAPI from "./apiService";
import photosMarkup from "../template/photo-card.hbs";
import imageMarkup from "../template/image.hbs";
import * as basicLightbox from "basiclightbox";
import { newError, newInfo, newSuccess } from "./pnotify";

const pixabayAPI = new PixabayAPI();

refs.searchForm.addEventListener("submit", onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  if (!refs.searchQuery.value) {
    newError();
    return;
  }

  pixabayAPI.resetPage();
  refs.gallery.innerHTML = "";

  pixabayAPI.query = refs.searchQuery.value;

  pixabayAPI.fetchImages().then(({ hits }) => {
    renderImages(hits);

    if (!hits.length) {
      newInfo();
      return;
    } else newSuccess();
  });
}

function renderImages(images) {
  refs.gallery.insertAdjacentHTML("beforeend", photosMarkup(images));
  refs.gallery.addEventListener("click", openImage);
}

const onEntry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && refs.searchQuery.value !== "") {
      pixabayAPI.fetchImages().then(({ hits }) => {
        renderImages(hits);
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: "300px",
});

observer.observe(refs.sentinel);

async function openImage(evt) {
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
