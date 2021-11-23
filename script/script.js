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

function createPhotoElement(...placeName, ...photoLink) {
  const templatePhoto = document.querySelector('#template-photo').content;
  const photoItem = templatePhoto.querySelector('.photo-grid__item').cloneNode(true);
  photoItem.querySelector('.photo-grid__title').textContent = placeName;
  photoItem.querySelector('.photo-grid__image').src = photoLink;
  photoItem.querySelector('.photo-grid__image').alt = placeName;

  photoContainer.append(photoItem);
}

createPhotoElement(...initialCards.name, ...initialCards.link);
createPhotoElement(initialCards[1].name, initialCards[1].link);