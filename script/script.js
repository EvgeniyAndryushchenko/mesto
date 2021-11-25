const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__profession');
const editButtonProfile = profile.querySelector('.profile__edit-button');
const addButtonProfile = profile.querySelector('.profile__add-button');


const submitButtons = document.querySelectorAll('.popup__button_type_submit');
const closeButtons = document.querySelectorAll('.popup__button_type_close');
const popup = document.querySelector('.popup');

const initialPopups = [
  {
    popupClass: 'popup__profile',
    nameId: 'popup__input_type_name',
    additionId: 'popup__input_type_profession',
    heading: 'Редактировать профиль',
    name: 'Жак-Ив Кусто',
    addition: 'Исследователь океана'
  },
  {
    popupClass: 'popup__picture',
    nameId: 'popup__input_type_heading',
    additionId: 'popup__input_type_link',
    heading: 'Новое место',
    name: 'Название',
    addition: 'Ссылка на картинку'
  }
];

function openPopup() {
  popup.classList.add('popup_visible');
}

function closePopup() {
  popup.classList.remove('popup_visible');
  editButtonProfile.addEventListener('click', handleEditProfile);
}

function submitPopup(evt) {
  evt.preventDefault();
  //nameProfile.textContent = nameInput.value;
  //jobProfile.textContent = jobInput.value;

  closePopup();
}

function createPopup(item) {
  const templateObject = document.querySelector('#template-popup').content;
  const templatePopup = templateObject.querySelector('.popup').cloneNode(true);
  const submitButton = templatePopup.querySelector('.popup__button_type_submit');
  const closeButton = templatePopup.querySelector('.popup__button_type_close');
  const nameInput = templatePopup.querySelector('.popup__input_type_name');
  const additionInput = templatePopup.querySelector('.popup__input_type_addition');

  templatePopup.querySelector('.popup__heading').textContent = item.heading;
  nameInput.id = item.nameId;
  nameInput.placeholder = item.name;
  additionInput.id = item.additionId;
  additionInput.placeholder = item.addition;

  templatePopup.classList.add(item.popupClass);
  closeButton.addEventListener('click', closePopup);
  submitButton.addEventListener('click', submitPopup);
  return templatePopup;
}

let createListPopups = initialPopups.map(function (item) {
  return createPopup(item);
});

document.querySelector('.content').append(...createListPopups);

function handleEditProfile() {
  //nameInput.value = nameProfile.textContent;
  //jobInput.value = jobProfile.textContent;

  //closeButtons.addEventListener('click', closePopup);
  //submitButtons.addEventListener('click', submitPopup);

  openPopup()
}


editButtonProfile.addEventListener('click', handleEditProfile);
addButtonProfile.addEventListener('click', handleEditProfile);



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const photoContainer = document.querySelector('.photo-grid__items');

function createPhotoElement(item) {
  const templatePhoto = document.querySelector('#template-photo').content;
  const photoItem = templatePhoto.querySelector('.photo-grid__item').cloneNode(true);
  photoItem.querySelector('.photo-grid__title').textContent = item.name;
  photoItem.querySelector('.photo-grid__image').src = item.link;
  photoItem.querySelector('.photo-grid__image').alt = item.name;

  return photoItem;
}

let createListPhoto = initialCards.map(function (item) {
  return createPhotoElement(item);
});

photoContainer.append(...createListPhoto);

