const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__profession');
const editButtonProfile = profile.querySelector('.profile__edit-button');
const addButtonProfile = profile.querySelector('.profile__add-button');
const photoContainer = document.querySelector('.photo-grid__items');

const popupPicture = document.querySelector('.popup-picture');
const popupProfile = document.querySelector('.popup-profile');
const popupPreview = document.querySelector('.popup-preview');

const photoImg = photoContainer.querySelector('.photo-grid__image');
const photoPreviewImg = popupPreview.querySelector('.popup__image');
const closePreviewButton = popupPreview.querySelector('.popup__button_type_close');


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

// Функция окрытия и закрытия оверлея

function togglePopupPreview() {
  popupPreview.classList.toggle('hidden');
}

// Создать оверлей

function openPhotoElement(evt) {
  const picName = evt.target.alt;
  popupPreview.querySelector('.popup__open-heading').textContent = picName.slice(0, - 1);
  photoPreviewImg.src = evt.target.src;
  photoPreviewImg.alt = picName;

  closePreviewButton.addEventListener('click', togglePopupPreview);
  togglePopupPreview();
}

// Создать новые фото

function createPhotoElement(data) {
  const templatePhoto = document.querySelector('#template-photo').content;
  const photoItem = templatePhoto.querySelector('.photo-grid__item').cloneNode(true);
  const photoImg = photoItem.querySelector('.photo-grid__image');
  const handle = photoItem.querySelector('.photo-grid__input_type_checkbox');
  const like = photoItem.querySelector('.photo-grid__heart-icon');
  const deleteButton = photoItem.querySelector('.photo-grid__remove');

  photoItem.querySelector('.photo-grid__title').textContent = data.name;
  photoImg.src = data.link;
  photoImg.alt = data.name + '.';

  function handleLike() {
    like.classList.toggle('photo-grid__heart-icon_checked');
  }

  function deletePhoto() {
    photoItem.remove();
  }

  handle.addEventListener('click', handleLike);
  deleteButton.addEventListener('click', deletePhoto);
  photoImg.addEventListener('click', openPhotoElement);

  return photoItem;
}

let createListPhoto = initialCards.map((item) => {
  return createPhotoElement(item);
});


function renderCard(card) {
  photoContainer.prepend(...card);
}

renderCard(createListPhoto);

// Открыть и закрыть попап

function closeModal(popup) {
  popup.classList.add('hidden');
} 

function openModal(popup) {
  popup.classList.remove('hidden');
}

function closePopupProfile() {
  closeModal(popupProfile);
}

function closePopupPicture() {
  closeModal(popupPicture);
}

function openPopupProfile() {
  const closeButton = popupProfile.querySelector('.popup__button_type_close');
  const submitButton = popupProfile.querySelector('.popup__button_type_submit');
  const nameInput = popupProfile.querySelector('.popup__input_type_name');
  const additionInput = popupProfile.querySelector('.popup__input_type_addition');

  nameInput.value = nameProfile.textContent;
  additionInput.value = jobProfile.textContent;

  closeButton.addEventListener('click', closePopupProfile);

  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = additionInput.value;

    closePopupProfile();
  });

  openModal(popupProfile);
}


function openPopupPicture() {
  const closeButton = popupPicture.querySelector('.popup__button_type_close');
  const submitButton = popupPicture.querySelector('.popup__button_type_submit');
  const nameInput = popupPicture.querySelector('.popup__input_type_name');
  const additionInput = popupPicture.querySelector('.popup__input_type_addition');
  let newCard = {};

  closeButton.addEventListener('click', closePopupPicture);

  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
        
    newCard.name = nameInput.value;
    newCard.link = additionInput.value;

    photoContainer.prepend(createPhotoElement(newCard));

    nameInput.value = '';
    additionInput.value = '';

    closePopupPicture();
  });

  openModal(popupPicture);
}

// Назначить слушатели

editButtonProfile.addEventListener('click', openPopupProfile);
addButtonProfile.addEventListener('click', openPopupPicture);

