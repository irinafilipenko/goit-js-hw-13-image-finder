// import { defaults } from 'gh-pages';
import './sass/main.scss';
// import debounce from 'lodash.debounce';
import renderFormTempl from './templates/render-form.hbs';
import NewsApiService from './js/apiService';
import galleryTempl from './templates/gallery.hbs';
import galleryCardTempt from './templates/gallery-card.hbs';

const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', renderFormTempl());

const refs = {
  searchForm: document.querySelector('.search-form'),

  createGalery: document.querySelector('.gallery'),

  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newApiService = new NewsApiService();
console.dir(newApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearGalleryContainer();
  newApiService.query = e.currentTarget.elements.query.value;
  if (newApiService.query === '') {
    return alert('error');
  }
  newApiService.resetPage();
  newApiService.fetchArticles().then(onMakeGallery);

  refs.loadMoreBtn.classList.remove('is-hidden');
}

function onLoadMore() {
  newApiService.fetchArticles().then(onMakeGallery);
}

function onMakeGallery(hits) {
  refs.createGalery.insertAdjacentHTML('beforeend', galleryTempl(hits));
}
function clearGalleryContainer() {
  refs.createGalery.innerHTML = ' ';
}

// function onMakeGalleryCard(hits) {

// }

// newApiService.fetchArticles().then(onMakeGalleryCard);

let imgCardEl = document.querySelector('.images_card');
console.log(imgCardEl);
