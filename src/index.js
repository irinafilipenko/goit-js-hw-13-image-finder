import './sass/main.scss';

import renderFormTempl from './templates/render-form.hbs';
import NewsApiService from './js/apiService';
import galleryTempl from './templates/gallery.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', renderFormTempl());

const refs = {
  searchForm: document.querySelector('.search-form'),

  createGalery: document.querySelector('.gallery'),

  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  newApiService.query = e.currentTarget.elements.query.value;
  if (newApiService.query === '') {
    return onFetchError();
  }
  newApiService.resetPage();
  newApiService.fetchArticles().then(onMakeGallery).catch(onFetchError);

  refs.loadMoreBtn.classList.remove('is-hidden');
}

function onLoadMore() {
  newApiService.fetchArticles().then(onMakeGallery);
}

function onMakeGallery(hits) {
  refs.createGalery.insertAdjacentHTML('beforeend', galleryTempl(hits));
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

function clearGalleryContainer() {
  refs.createGalery.innerHTML = ' ';
}

function onFetchError() {
  error({
    text: 'Please enter a valid request',
  });
}

refs.createGalery.addEventListener('click', onContainerClick);

function onContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const changeImg = `<img src=${event.target.dataset.source} alt="icon" />`;
  const instance = basicLightbox.create(changeImg);

  instance.show();
}
