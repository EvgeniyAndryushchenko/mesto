const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__profession');
const editButtonProfile = profile.querySelector('.profile__edit-button');
const addButtonProfile = profile.querySelector('.profile__add-button');
const photoContainer = document.querySelector('.photo-grid__items');

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

// Удалить старые фото из разметки

const oldPhoto = photoContainer.querySelectorAll('.photo-grid__item');

oldPhoto.forEach((item) => {
  item.classList.add('hidden');
});

// Создать новые фото

function createPhotoElement(item) {
  const templatePhoto = document.querySelector('#template-photo').content;
  const photoItem = templatePhoto.querySelector('.photo-grid__item').cloneNode(true);
  photoItem.querySelector('.photo-grid__title').textContent = item.name;
  photoItem.querySelector('.photo-grid__image').src = item.link;
  photoItem.querySelector('.photo-grid__image').alt = item.name + '.';

  const handle = photoItem.querySelector('.photo-grid__input_type_checkbox');
  const like = photoItem.querySelector('.photo-grid__heart-icon');
  function handleLike() {
    like.classList.toggle('photo-grid__heart-icon_checked');
  }

  handle.addEventListener('click', handleLike);

  return photoItem;
}

let createListPhoto = initialCards.map(function (item) {
  return createPhotoElement(item);
});

// Открыть попап

function openPopup(selectorPopupClass) {
  const popup = document.querySelector(selectorPopupClass);
  popup.classList.add('popup_visible');
}

// Создать попап

function createPopup(item) {
  const templateObject = document.querySelector('#template-popup').content;
  const templatePopup = templateObject.querySelector('.popup').cloneNode(true);
  const nameInput = templatePopup.querySelector('.popup__input_type_name');
  const additionInput = templatePopup.querySelector('.popup__input_type_addition');
  const closeButton = templatePopup.querySelector('.popup__button_type_close');
  const submitButton = templatePopup.querySelector('.popup__button_type_submit');

  templatePopup.querySelector('.popup__heading').textContent = item.heading;
  nameInput.id = item.nameId;
  nameInput.placeholder = item.name;
  additionInput.id = item.additionId;
  additionInput.placeholder = item.addition;

  templatePopup.classList.add(item.popupClass);

  if (item.popupClass === 'popup__profile') {
    nameInput.value = nameProfile.textContent;
    additionInput.value = jobProfile.textContent;
  }

  function closePopup() {
    templatePopup.classList.remove('popup_visible');
  }

  closeButton.addEventListener('click', closePopup);

  submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      const nameInput = templatePopup.querySelector('.popup__input_type_name');
      const additionInput = templatePopup.querySelector('.popup__input_type_addition');

      if (item.popupClass === 'popup__profile') {
        nameProfile.textContent = nameInput.value;
        jobProfile.textContent = additionInput.value;
      } else if (item.popupClass === 'popup__picture') {
        const newCard = {};
        newCard.name = nameInput.value;
        newCard.link = additionInput.value;
        photoContainer.append(createPhotoElement(newCard));
        nameInput.value = '';
        additionInput.value = '';
      }

      closePopup();
  });

  return templatePopup;
}

let createListPopups = initialPopups.map(function (item) {
  return createPopup(item);
});

// Функции слушателей для разных кнопок

function handleButtonEdit() {
  const selectorPopupClass = '.' + initialPopups[0].popupClass;

  openPopup(selectorPopupClass);
}

function handleButtonAdd() {
  const selectorPopupClass = '.' + initialPopups[1].popupClass;

  openPopup(selectorPopupClass);
}

// Создать фото и попапы

photoContainer.append(...createListPhoto);
document.querySelector('.content').append(...createListPopups);

// Назначить слушатели на кнопки

editButtonProfile.addEventListener('click', handleButtonEdit);
addButtonProfile.addEventListener('click', handleButtonAdd);


