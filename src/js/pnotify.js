import { error, info, success } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const settings = {
  title: false,
  sticker: false,
  maxTextHeight: null,
  mouseReset: false,
  delay: 2000,
  width: "250px",
};

export const newError = () =>
  error({
    text: "Empty input! Enter something.",
    ...settings,
  });

export const newErrorLoad = () =>
  error({
    text: "Nothing to load. Search something!",
    ...settings,
  });

export const newInfo = () =>
  info({
    text: "I found nothing! Repeat the request.",
    ...settings,
  });

export const newSuccess = () =>
  success({
    text: "Look what I've just found for you :)",
    ...settings,
  });
