const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__profession');
const editButtonProfile = profile.querySelector('.profile__edit-button');
const addButtonProfile = profile.querySelector('.profile__add-button');

const photoContainer = document.querySelector('.photo-grid__items');
const photoImg = photoContainer.querySelector('.photo-grid__image');

const popupPicture = document.querySelector('.popup-picture');
const closeButtonPicture = popupPicture.querySelector('.popup__button_type_close');
const nameInputPicture = popupPicture.querySelector('.popup__input_type_name');
const additionInputPicture = popupPicture.querySelector('.popup__input_type_addition');
const formPicture = popupPicture.querySelector('.popup__form');
const newCard = {};

const popupProfile = document.querySelector('.popup-profile');
const closeButtonProfile = popupProfile.querySelector('.popup__button_type_close');
const nameInputProfile = popupProfile.querySelector('.popup__input_type_name');
const additionInputProfile = popupProfile.querySelector('.popup__input_type_addition');
const formProfile = popupProfile.querySelector('.popup__form');

const popupPreview = document.querySelector('.popup-preview');
const photoPreviewImg = popupPreview.querySelector('.popup__image');
const closePreviewButton = popupPreview.querySelector('.popup__button_type_close');

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

// Закрыть попап

function closeModal(popup) {
  popup.classList.add('hidden');
}

function closePopupProfile() {
  closeModal(popupProfile);
}

function closePopupPicture() {
  closeModal(popupPicture);
}

// Открыть попап

function openModal(popup) {
  popup.classList.remove('hidden');
}

function openPopupProfile() {
  nameInputProfile.value = nameProfile.textContent;
  additionInputProfile.value = jobProfile.textContent;

  openModal(popupProfile);
}

function openPopupPicture() {
  openModal(popupPicture);
}

// Назначить слушатели

editButtonProfile.addEventListener('click', openPopupProfile);
addButtonProfile.addEventListener('click', openPopupPicture);

closeButtonProfile.addEventListener('click', closePopupProfile);
closeButtonPicture.addEventListener('click', closePopupPicture);

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInputProfile.value;
  jobProfile.textContent = additionInputProfile.value;

  closePopupProfile();
});

formPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  newCard.name = nameInputPicture.value;
  newCard.link = additionInputPicture.value;

  photoContainer.prepend(createPhotoElement(newCard));

  nameInputPicture.value = '';
  additionInputPicture.value = '';

  closePopupPicture();
});






// 6 Спринт

const submitButtonProfile = popupProfile.querySelector('.popup__button_type_submit');

const submitButtonPicture = popupPicture.querySelector('.popup__button_type_submit');


const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.addEventListener('input', function (evt) {
    evt.preventDefault();
  });
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  const closeButtonElement = formElement.querySelector('.popup__button_type_close');
  closeButtonElement.addEventListener('click', (evt) => {
    hideInputError(formElement, inputElement);
  });
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button_type_submit');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    // fieldsetList.forEach((fieldsetElement) => setEventListeners(fieldsetElement));
    setEventListeners(formElement);
  });
}

enableValidation();

// const showError = (input, errorMessage) => {
//   input.classList.add('form__input_type_error');
//   input.textContent = errorMessage;
//   console.log(input.textContent);
//   console.dir(input);
//   // formError.classList.add('form__input-error_active');
// };



// const hideError = (input) => {
//   input.classList.remove('form__input_type_error');
//   // formError.classList.remove('form__input-error_active');
//   input.textContent = '';
//   console.log(input.textContent);
//   // 1. Удалите активный класс ошибки c formError.
//   // 2. Очистите свойство textContent элемента formError.
// };

// const checkInputValidityProfileName = () => {
//   if (!nameInputProfile.validity.valid) {
//     showError(nameInputProfile, nameInputProfile.validationMessage);
//     submitButtonProfile.disabled = true;
//   } else {
//     hideError(nameInputProfile);
//     submitButtonProfile.disabled = false;
//   }
// };

// const checkInputValidityProfileAdd = () => {
//   if (!additionInputProfile.validity.valid) {
//     showError(additionInputProfile, additionInputProfile.validationMessage);
//     submitButtonProfile.disabled = true;
//   } else {
//     hideError(additionInputProfile);
//     submitButtonProfile.disabled = false;
//   }
// };

// const checkInputValidityPictureName = () => {
//   if (!nameInputPicture.validity.valid) {
//     showError(nameInputPicture, nameInputPicture.validationMessage);
//     submitButtonPicture.disabled = true;
//   } else {
//     hideError(nameInputPicture);
//     submitButtonPicture.disabled = false;
//   }
// };

// const checkInputValidityPictureAdd = () => {
//   if (!additionInputPicture.validity.valid) {
//     showError(additionInputPicture, additionInputPicture.validationMessage);
//     submitButtonPicture.disabled = true;
//   } else {
//     hideError(additionInputPicture);
//     submitButtonPicture.disabled = false;
//   }
// };

// // formElement.addEventListener('submit', function (evt) {
// //   evt.preventDefault();
// // });

// nameInputProfile.addEventListener('input', function () {
//   checkInputValidityProfileName();
// });

// additionInputProfile.addEventListener('input', function () {
//   checkInputValidityProfileAdd();
// });

// checkInputValidityPictureName();
// checkInputValidityPictureAdd();

// nameInputPicture.addEventListener('input', function () {
//   checkInputValidityPictureName();
// });

// additionInputPicture.addEventListener('input', function () {
//   checkInputValidityPictureAdd();
// });








