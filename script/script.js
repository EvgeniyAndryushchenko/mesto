const ESC_KEYCODE = 27;

let profile = document.querySelector('.profile');
let nameProfile = profile.querySelector('.profile__name');
let jobProfile = profile.querySelector('.profile__profession');
let editButtonProfile = profile.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let nameInput = popup.querySelector('.popup__profile-name');
let jobInput = popup.querySelector('.popup__profile-profession');
let submitButton = popup.querySelector('.popup__submit');
let closeButton = popup.querySelector('.popup__close-button');


function onEditButtonProfileClick(evt) {
  evt.preventDefault();
  let nameProfileTextContent = nameProfile.textContent;
  let jobProfileTextContent = jobProfile.textContent;

  nameInput.value = nameProfileTextContent;
  jobInput.value = jobProfileTextContent;

  popup.classList.add('popup_visible');
  document.addEventListener('keydown', onPressEsc);
  closeButton.addEventListener('click', onPopupCloseClick);
  closeButton.addEventListener('keydown', onPopupCloseClick);
  submitButton.addEventListener('click', onPopupSubmitClick);
}

function onPopupCloseClick() {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', onPressEsc);
  closeButton.removeEventListener('click', onPopupCloseClick);
  closeButton.removeEventListener('keydown', onPopupCloseClick);
  editButtonProfile.addEventListener('click', onEditButtonProfileClick);

  nameProfile.textContent = nameProfileTextContent;
  jobProfile.textContent = jobProfileTextContent;
}

function onPressEsc(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onPopupCloseClick();
  }
}

function onPopupSubmitClick() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  onPopupCloseClick();
}

editButtonProfile.addEventListener('click', onEditButtonProfileClick);

