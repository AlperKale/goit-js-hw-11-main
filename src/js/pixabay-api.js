// // написання функції для HTTP-запитів

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';  // Це має бути правильно

const API_KEY = '49399736-5639b789053676a95c3f2e38d';  // Перевірити, чи ключ правильний

export default function httpRequest(userRequest) {
  const paramsForHttp = new URLSearchParams({
    q: userRequest, 
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios.get(`?${paramsForHttp}`)
    .then(response => response.data.hits)  // Перевіряємо, чи відповідає структура даних
    .catch(error => {
      throw error;  // Повертати повну помилку, щоб вона була доступною в `index.js`
    });
}
