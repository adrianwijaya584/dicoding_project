import './card';

class CatList extends HTMLElement {
  _catListsWrapper= document.createElement('div');

  set cats(cats) {
    this._cats= cats;

    this.render();
  }

  connectedCallback() {
    this.append(this._catListsWrapper);

    this.renderLoading();
  }

  render() {
    this.innerHTML= '';
    this._catListsWrapper.innerHTML= '';

    const catListCards= document.createElement('div');
    catListCards.classList.add('cat-cards-wrapper');

    const catListsHeader= document.createElement('div');
    catListsHeader.classList.add('cat-list-header');
    catListsHeader.innerHTML= `
      <h1>Daftar Kucing</h1>
      <hr/>
    `;

    this._cats.forEach((cat)=> {
      const catCard= document.createElement('cat-card');

      catCard.cat= cat;
      catListCards.append(catCard);
    });

    this._catListsWrapper.append(catListCards);

    this.append(catListsHeader, this._catListsWrapper);
  }

  renderLoading() {
    this._catListsWrapper.innerHTML= `
      <div class="cat-list-message">
        <p>Mengambil data kucing...</p>
      </div>
    `;
  }

  renderNotFound() {
    this._catListsWrapper.innerHTML= `
      <div class="cat-list-message">
        <p>Daftar kucing tidak ditemukan</p>
      </div>
    `;
  }

  renderError() {
    this._catListsWrapper.innerHTML= `
      <div class="cat-list-message">
        <p>Maaf, terjadi kesalahan di server</p>
      </div>
    `;
  }
}

export default customElements.define('cat-list', CatList);
