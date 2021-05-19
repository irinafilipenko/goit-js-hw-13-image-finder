import { refs } from './js/refs.js';

const crateInput = (refs.body.innerHTML = `<form class="search-form" id="search-form">
  <input
    type="text"
    name="query"
    autocomplete="off"
    placeholder="Search images..."
  />
</form>`);
