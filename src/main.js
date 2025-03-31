

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import httpRequest from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', request);

function request(event) {
  event.preventDefault();
  const userRequest = event.currentTarget.elements.user_request.value.trim();

  if (!userRequest) {
    iziToast.warning({
      title: 'WARNING',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  httpRequest(userRequest)
    .then(images => {
      hideLoader();
      if (images.length === 0) {
        iziToast.error({
          title: 'ERROR',
          message: 'No images found. Try another search term!',
          position: 'topRight',
        });
        return;
      }
      renderGallery(images);
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'ERROR',
        message: `Error fetching images: ${error.message}`,
        position: 'topRight',
      });
    });

  event.target.reset();
}

function showLoader() {
  refs.loader.classList.remove('visually-hidden');  // Показуємо loader
}

function hideLoader() {
  refs.loader.classList.add('visually-hidden');  // Ховаємо loader
}
