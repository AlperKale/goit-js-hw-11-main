// // функції для відображення елементів інтерфейсу

// ==================

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createCart(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;

  return `
    <li class="li-gallery">
      <a class="li-gallery-a" href="${largeImageURL}">
        <img class="img" src="${webformatURL}" alt="${tags}" />
      </a>
      <ul class="baner-info">
        <li class="baner-info-li">
          <p class="baner-info-li-title">Likes</p>
          <p class="baner-info-li-text">${likes}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Views</p>
          <p class="baner-info-li-text">${views}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Comments</p>
          <p class="baner-info-li-text">${comments}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Downloads</p>
          <p class="baner-info-li-text">${downloads}</p>
        </li>
      </ul>
    </li>`;
}

export function createsCart(items) {
  return items.map(createCart).join('');
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';  // Очищаємо галерею
  }
}

export function renderGallery(data) {
  const refs = {
    list: document.querySelector('.gallery'),
  };

  if (!refs.list) {
    console.error('No images found');
    return;
  }

  clearGallery();

  if (data.length === 0) {
    iziToast.warning({
      title: 'No images found',
      message: 'Try another search term!',
      position: 'topRight',
    });
    return;
  }

  const markup = createsCart(data);
  refs.list.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    animationSpeed: 250,
  });

  lightbox.refresh();
}
