import {initialCards, Card} from './Card.js';
import {validationForm, FormValidator} from './FormValidator.js';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__profession');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const photoContainer = document.querySelector('.photo-grid__items');

const popupPicture = document.querySelector('.popup-picture');
const pictureSubmitButton = popupPicture.querySelector('.popup__button_type_submit');
const pictureCloseButton = popupPicture.querySelector('.popup__button_type_close');
const pictureNameInput = popupPicture.querySelector('.popup__input_type_name');
const pictureAdditionInput = popupPicture.querySelector('.popup__input_type_addition');
const formPicture = popupPicture.querySelector('.popup__form');

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
const templatePhotoSelector = '#template-photo';


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

// Открыть попап


const validation = new FormValidator(validationForm);
validation.enableValidation(validationForm);
console.log(validation);



function openModal(popup) {
  popup.classList.remove(classHidden);
  setKeydownOverlay();
}

function openPopupProfile() {
  validation.resetInputError(formProfile);

  profileNameInput.value = profileName.textContent;
  profileAdditionInput.value = profileJob.textContent;

  validation.disableSubmitButton(profileSubmitButton);
  openModal(popupProfile);
}

function openPopupPicture() {
  formPicture.reset();
  validation.resetInputError(formPicture);

  validation.disableSubmitButton(pictureSubmitButton);
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

function renderCard(data, cardSelector) {
  data.forEach(element => {
    const card = new Card(element, cardSelector);
    const cardElement = card.generateCard();
    photoContainer.prepend(cardElement);
  });

}

// Подтверждение форм

const submitProfile = (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileAdditionInput.value;

  closePopupProfile();
}

const submitPicture = (evt) => {
  evt.preventDefault();

  const newCard = [{}];

  newCard[0].name = pictureNameInput.value;
  newCard[0].link = pictureAdditionInput.value;

  renderCard(newCard, templatePhotoSelector);
  closePopupPicture();
}

// Назначить слушатели

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupPicture);

profileCloseButton.addEventListener('click', closePopupProfile);
pictureCloseButton.addEventListener('click', closePopupPicture);
previewCloseButton.addEventListener('click', closePopupPreview);

formProfile.addEventListener('submit', submitProfile);
formPicture.addEventListener('submit', submitPicture);

renderCard(initialCards, templatePhotoSelector);
setOverlayListeners();

// function validateForm(data) {
//   data.forEach(element => {
//     const validation = new FormValidator(element);
//   });

// }



// validateForm(validationForm);
// FormValidator.enableValidation();

export {openPhotoElement};

