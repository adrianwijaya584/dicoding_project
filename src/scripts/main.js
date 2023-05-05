import $ from 'jquery';
import axios from './axios';

const cats= [];

const catListEl= document.querySelector('cat-list');

$(()=> {
  getCats();

  $('#searchBar').on('input', (e)=> {
    if (cats.length > 0) {
      const filteredCats= cats.filter((cat)=>
        cat.breeds[0].name.toLowerCase().includes(
            e.target.value.toLowerCase(),
        ));

      if (!filteredCats.length) {
        return catListEl.renderNotFound();
      }
      catListEl.cats= filteredCats;
    }
  });

  $('#closeModal').on('click', ()=> {
    $('#modal').removeClass('modal-hidden');
  });

  $('#modal').on('click', (e)=> {
    if (e.target.contains(document.querySelector('.modal-wrapper'))) {
      $('#modal').addClass('modal-hidden');
    }
  });
});

const getCats= async ()=> {
  try {
    cats.length= 0;

    const catsData= await axios.get('images/search', {
      params: {
        limit: 20,
        has_breeds: true,
      },
    });

    cats.push(...catsData);
    catListEl.cats= cats;
  } catch (error) {
    catListEl.renderError();
  }
};
