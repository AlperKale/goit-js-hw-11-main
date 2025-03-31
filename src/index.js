import './css/style.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery, showLoadMoreBtn, hideLoadMoreBtn } from './js/render-functions.js';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
const perPage = 40;
let totalHits = 0;

hideLoadMoreBtn();

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('submit', onLoadMoreBtnClick);

async function onSearchFormSubmit(e) {
  e.preventDefault();
  currentPage = 1;
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  
  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search term!');
    return;
  }
  
  currentQuery = searchQuery;
  clearGallery();
  hideLoadMoreBtn();
  
  try {
    const { hits, totalHits: total } = await fetchImages(searchQuery, currentPage, perPage);
    totalHits = total;
    
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    
    renderGallery(hits);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    
    if (currentPage * perPage < totalHits) {
      showLoadMoreBtn();
    }
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
}

async function onLoadMoreBtnClick() {
  currentPage += 1;
  
  try {
    const { hits } = await fetchImages(currentQuery, currentPage, perPage);
    renderGallery(hits, true);
    
    const totalPages = Math.ceil(totalHits / perPage);
    
    if (currentPage >= totalPages) {
      hideLoadMoreBtn();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('An error occurred while loading more images. Please try again later.');
  }
} 