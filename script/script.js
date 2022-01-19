const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__profession');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const photoContainer = document.querySelector('.photo-grid__items');
const photoImg = photoContainer.querySelector('.photo-grid__image');

const popupPicture = document.querySelector('.popup-picture');
const pictureSubmitButton = popupPicture.querySelector('.popup__button_type_submit');
const pictureCloseButton = popupPicture.querySelector('.popup__button_type_close');
const pictureNameInput = popupPicture.querySelector('.popup__input_type_name');
const pictureAdditionInput = popupPicture.querySelector('.popup__input_type_addition');
const formPicture = popupPicture.querySelector('.popup__form');
const newCard = {};

const popupProfile = document.querySelector('.popup-profile');
const profileSubmitButton = popupProfile.querySelector('.popup__button_type_submit');
const profileCloseButton = popupProfile.querySelector('.popup__button_type_close');
const profileNameInput = popupProfile.querySelector('.popup__input_type_name');
const profileAdditionInput = popupProfile.querySelector('.popup__input_type_addition');
const formProfile = popupProfile.querySelector('.popup__form');

const popupPreview = document.querySelector('.popup-preview');
const photoPreviewImg = popupPreview.querySelector('.popup__image');
const previewCloseButton = popupPreview.querySelector('.popup__button_type_close');

const classHidden = 'hidden';
const escKeycode = "Escape";
const overlayList = Array.from(document.querySelectorAll('.popup'));

// Закрыть попап

function closeModal(popup) {
  popup.classList.add('hidden');
  removeKeydownOverlay();
}

function closePopupProfile() {
  closeModal(popupProfile);
}

function closePopupPicture() {
  closeModal(popupPicture);
}

function closePopupPreview() {
  closeModal(popupPreview);
}

// Overlay

const clickOverlay = (evt, popup) => {
  if (evt.target == popup && !popup.classList.contains(classHidden)) {
    closeModal(popup);
  }
}

const keydownOverlay = function (evt) {

  const overlayVisible = overlayList.filter((popup) => {
    if (!popup.classList.contains(classHidden)) {
      return popup;
    }
  });

  overlayVisible.forEach((popup) => {
    if ((evt.key == escKeycode) && (popup)) {
      closeModal(popup);
    }
  });
}

const setKeydownOverlay = () => {
  document.addEventListener('keydown', keydownOverlay);
};

const removeKeydownOverlay = () => {
  document.removeEventListener('keydown', keydownOverlay);
};

function setOverlayListeners() {
  overlayList.forEach(popup => {
    popup.addEventListener('click', (evt) => {clickOverlay(evt, popup);});
  });
}


// Сброс полей формы после ошибок

const resetInputError = (formElement, inputSelector, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
}


// Открыть попап

function openModal(popup) {
  popup.classList.remove(classHidden);
  setKeydownOverlay();
}

function openPopupProfile() {
  resetInputError(formProfile, validationForm.inputSelector,
    validationForm.inputErrorClass, validationForm.errorClass);

  profileNameInput.value = profileName.textContent;
  profileAdditionInput.value = profileJob.textContent;

  disableSubmitButton(profileSubmitButton, validationForm.inactiveButtonClass);
  openModal(popupProfile);
}

function openPopupPicture() {
  formPicture.reset();
  resetInputError(formPicture, validationForm.inputSelector,
    validationForm.inputErrorClass, validationForm.errorClass);

  disableSubmitButton(pictureSubmitButton, validationForm.inactiveButtonClass);
  openModal(popupPicture);
}

function openPopupPreview() {
  openModal(popupPreview);
}

// Открыть фото в оверлее

function openPhotoElement(evt) {
  const picName = evt.target.alt;
  popupPreview.querySelector('.popup__open-heading').textContent = picName.slice(0, - 1);
  photoPreviewImg.src = evt.target.src;
  photoPreviewImg.alt = picName;

  openPopupPreview();
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

// Назначить слушатели

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupPicture);

profileCloseButton.addEventListener('click', closePopupProfile);
pictureCloseButton.addEventListener('click', closePopupPicture);
previewCloseButton.addEventListener('click', closePopupPreview);

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileAdditionInput.value;

  closePopupProfile();
});

formPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  newCard.name = pictureNameInput.value;
  newCard.link = pictureAdditionInput.value;

  photoContainer.prepend(createPhotoElement(newCard));

  pictureNameInput.value = '';
  pictureAdditionInput.value = '';

  closePopupPicture();
});

setOverlayListeners();
