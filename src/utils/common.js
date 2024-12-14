import { LOCAL_KEY_CATEGORY, LOCAL_KEY_POST, LOCAL_KEY_COURSE, SERVER_URL } from "../const/common";
import useLocalStorage from "../hooks/useLocalStorage";

export function scrollToTop(scrollDuration) {
  const scrollStep = -window.scrollY / (scrollDuration / 15),
    scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      }
      else clearInterval(scrollInterval);
    }, 15);
}

export function convertSecondstoHHMMSS(secs) {
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

export function getLogo() {
  return `/dnsoft-favicon.png`;
}

export function getAvatar() {
  return `${SERVER_URL}/vendor/dnsoft/v1/web/img/dong-nguyen.jpeg`;
}

export function convertToSlug(url) {
  const arrUrl = url.split('/');
  return arrUrl[arrUrl.length - 1];
}

export function getFileName (url) {
  return url.split('/').pop();
}

export function showPostInCategory(item) {
  useLocalStorage(LOCAL_KEY_CATEGORY, JSON.stringify(item.id))
}

export function showPostDetail(item) {
  useLocalStorage(LOCAL_KEY_POST, JSON.stringify(item.id));
}

export function getCourseByCategory(item) {
  useLocalStorage(LOCAL_KEY_COURSE, JSON.stringify(item.id));
}
