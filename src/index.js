// import { defaults } from 'gh-pages';
import './sass/main.scss';

import templates from './templates/render-form.hbs';
import { refs } from './js/refs.js';

console.log(templates());
console.log(refs.inputEl);

refs.body.innerHTML = templates();
console.log(refs.inputEl);

const url =
  'https://pixabay.com/api/?key=21672899-2a5ee6aa4aab0c8363895dd3b&q=yellow+flowers&image_type=photo&per_page=5&page=3';

fetch(url)
  .then(r => r.json())
  .then(console.log);
