import axios from 'axios';
import { Notify } from 'notiflix';
import { page } from '../index';

const IMAGES_API_URL = 'https://pixabay.com/api/';


async function fetchImages(inputValue, page) {
    try {
        const response = await axios.get(IMAGES_API_URL, {
            method: 'get',
            params: {
              key: '2857319-3e88db59d4c1fb5299f0a9a73',
              q: inputValue,
              image_type: 'photo',
              orientation: 'horizontal',
              safesearch: true,
              per_page: 40,
              page: page,
            },
        });

        //no results
        if (response.data.total === 0 && page === 1) {
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        };
        
        //show results
        if (response.data.total > 0 && page === 1)
            Notify.success(
                `Hooray! We found ${response.data.total} images.`
            );
        console.log('Fetch successful!', `Value is: "`,inputValue,`" on page:`, page, response.data,);
        return response.data;
       
    } catch (error) {
        console.log('Something went wrong.', error);
      }
};

export { fetchImages };