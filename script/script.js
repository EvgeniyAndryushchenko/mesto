const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__profession');
const editButtonProfile = profile.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_profession');
const submitButton = popup.querySelector('.popup__button_type_submit');
const closeButton = popup.querySelector('.popup__button_type_close');



function openPopup() {
  popup.classList.add('popup_visible');
}

function createPopup(heading, name, profession) {
  const templatePopup = document.querySelector('#template-popup').content;
  const popup = templatePopup.querySelector('.popup').cloneNode(true);
  popup.querySelector('.popup__heading').textContent = heading;
  popup.querySelector('.popup__input_type_name').placeholder = name;
  popup.querySelector('.popup__input_type_profession').placeholder = profession;


  popup.classList.add('popup_visible');
  return popup;
}

document.querySelector('.page').append(createPopup("Редактировать профиль", "Жак-Ив", "Исследователь"));

//let createListPhoto = initialCards.map(function (item) {
//  return createPhotoElement(item);
//});


function closePopup() {
  popup.classList.remove('popup_visible');
  editButtonProfile.addEventListener('click', handleEditProfile);
}

function submitPopup(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup();
}

function handleEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  closeButton.addEventListener('click', closePopup);
  submitButton.addEventListener('click', submitPopup);

  openPopup()
}


editButtonProfile.addEventListener('click', handleEditProfile);



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

