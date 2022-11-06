import { fetchImages } from './js/fetchImages';
import { renderImages } from './js/renderGallery';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const input = document.querySelector('#search-form input');
const searchBtn = document.querySelector('#search-button');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

//@ts-ignore
loadMoreBtn.style.display = 'none';

let lightbox;
let page = 1;
export { page };

//serch function
const search = () => {
    event.preventDefault();
   
    const name = input.value.trim();

    fetchImages(name, page)
      .then(images => {
        Loading.circle();
        renderImages(images.hits);
        lightbox = new SimpleLightbox('.gallery a').refresh();

        loadMoreBtn.style.display = 'block';

        const totalPages = Math.ceil(images.totalHits / 40);

        if (page === totalPages) {
          loadMoreBtn.style.display = 'none';
          Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        Loading.remove();
      });
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