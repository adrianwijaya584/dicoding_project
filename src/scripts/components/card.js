import $ from 'jquery';

class CatCard extends HTMLElement {
  set cat(cat) {
    this._cat= cat;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const cat= this._cat;
    const breed= cat.breeds[0];

    const detailBtn= document.createElement('button');
    detailBtn.innerHTML= `<i class='mdi mdi-eye'></i> Lihat detail `;
    detailBtn.addEventListener('click', ()=> {
      $('#modal').removeClass('modal-hidden');
      $('#modal .modal-header h3').html(breed.name);
      $('#modal .modal-body').html(`
        <img src='${cat.url}' alt='${breed.name} image' 
        style='max-height: 200px; margin: 0 auto' />
        <p>Berat : ${breed.weight.metric}</p>
        <p>Negara Asal : ${breed.origin}</p>
        <p>${breed.description}</p>
    `);
    });

    this.innerHTML= `
      <img src='${cat.url}' alt='${breed.name} image' />
      <h4>${breed.name}</h4>
      <h5>${breed.origin}</h5>
    `;

    this.appendChild(detailBtn);
  }
}

export default customElements.define('cat-card', CatCard);
