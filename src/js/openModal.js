import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const changeImg = `<img src=${event.target.dataset.source} alt="icon" />`;
  const instance = basicLightbox.create(changeImg);

  instance.show();
}

export { onContainerClick };
