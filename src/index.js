import { fetchImages } from './js/fetchImages';
import { renderImages } from './js/renderGallery';
import { Notify } from 'notiflix';


const input = document.querySelector('#search-form input');
const searchBtn = document.querySelector('#search-button');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

//@ts-ignore
loadMoreBtn.style.display = 'none';

let page = 1;
export { page };

//serch function
const search = () => {
    event.preventDefault();
   
    const name = input.value.trim();
  
    fetchImages(name, page)
      .then(images => {
        renderImages(images.hits);
      })
      .catch(error => console.log(error));
  };


//event listeners
searchBtn.addEventListener('click', () => {
    event.preventDefault();
  
    //check length
    if (input.value.trim().length >= 1) {
      gallery.innerHTML = '';
      search();
    } else {
      Notify.failure('Please enter something.');
    }
})