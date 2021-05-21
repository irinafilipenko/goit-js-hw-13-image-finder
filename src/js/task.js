import { onFetchError } from './pnotifity';
import renderFormTempl from '../templates/render-form.hbs';
import NewsApiService from './apiService';
import galleryTempl from '../templates/gallery.hbs';

import { onContainerClick } from './openModal';

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
refs.createGalery.addEventListener('click', onContainerClick);

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
