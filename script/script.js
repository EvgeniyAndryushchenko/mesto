const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__profession');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const photoContainer = document.querySelector('.photo-grid__items');
const photoImg = photoContainer.querySelector('.photo-grid__image');

const popupPicture = document.querySelector('.popup-picture');
const pictureCloseButton = popupPicture.querySelector('.popup__button_type_close');
const pictureNameInput = popupPicture.querySelector('.popup__input_type_name');
const pictureAdditionInput = popupPicture.querySelector('.popup__input_type_addition');
const formPicture = popupPicture.querySelector('.popup__form');
const newCard = {};

const popupProfile = document.querySelector('.popup-profile');
const profileCloseButton = popupProfile.querySelector('.popup__button_type_close');
const profileNameInput = popupProfile.querySelector('.popup__input_type_name');
const profileAdditionInput = popupProfile.querySelector('.popup__input_type_addition');
const formProfile = popupProfile.querySelector('.popup__form');

const popupPreview = document.querySelector('.popup-preview');
const photoPreviewImg = popupPreview.querySelector('.popup__image');
const previewCloseButton = popupPreview.querySelector('.popup__button_type_close');

const escKeycode = "Escape";

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

function closePopupPreview() {
  closeModal(popupPreview);
}

// Overlay

const removeOverlayListeners = (popup) => {
  popup.removeEventListener('click', (evt) => {clickOverlay(evt, popup);});
  window.removeEventListener('keydown', (evt) => {keydownOverlay(evt, popup);});
}

const clickOverlay = (evt, popup) => {
  if (evt.target == popup) {
    closeModal(popup);
    removeOverlayListeners(popup);
  }
}
const keydownOverlay = (evt, popup) => {
  if (evt.key === escKeycode) {
    closeModal(popup);
    removeOverlayListeners(popup);
  }
}
const setOverlayListeners = (popup) => {
  popup.addEventListener('click', (evt) => {clickOverlay(evt, popup);});
  window.addEventListener('keydown', (evt) => {keydownOverlay(evt, popup);});
}

// Открыть попап

function openModal(popup) {
  popup.classList.remove('hidden');
}

function openPopupProfile() {
  profileNameInput.value = profileName.textContent;
  profileAdditionInput.value = profileJob.textContent;

  disableSubmitButton(popupProfile.querySelector('.popup__button_type_submit'), 'popup__button_inactive');
  setOverlayListeners(popupProfile);
  openModal(popupProfile);
}

function openPopupPicture() {
  disableSubmitButton(popupPicture.querySelector('.popup__button_type_submit'), 'popup__button_inactive');
  setOverlayListeners(popupPicture);
  openModal(popupPicture);
}

function openPopupPreview() {
  setOverlayListeners(popupPreview);
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

