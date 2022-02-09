import {openPhotoElement} from './index.js';


class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate() {
    const templatePhoto = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

      return templatePhoto;
  }

  _handleLike() {
    this._like.classList.toggle('photo-grid__heart-icon_checked');
  }

  _deletePhoto() {
    this._photoCard.remove();
  }

  _setEventListeners() {
    this._handle.addEventListener('click', () => {this._handleLike()});
    this._deleteButton.addEventListener('click', () => {this._deletePhoto()});
    this._photoImg.addEventListener('click', openPhotoElement);
  }

  generateCard() {
    this._photoCard = this._getTemplate();

    this._photoImg = this._photoCard.querySelector('.photo-grid__image');
    this._handle = this._photoCard.querySelector('.photo-grid__input_type_checkbox');
    this._like = this._photoCard.querySelector('.photo-grid__heart-icon');
    this._deleteButton = this._photoCard.querySelector('.photo-grid__remove');

    this._photoCard.querySelector('.photo-grid__title').textContent = this._name;
    this._photoImg.src = this._link;
    this._photoImg.alt = this._name + '.';

    this._setEventListeners();

    return this._photoCard;
  }
}

export {Card};
