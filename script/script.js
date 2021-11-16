const PROFILE = document.querySelector('.profile');
const NAME_PROFILE = PROFILE.querySelector('.profile__name');
const JOB_PROFILE = PROFILE.querySelector('.profile__profession');
const EDIT_BUTTON_PROFILE = PROFILE.querySelector('.profile__edit-button');

const POPUP = document.querySelector('.popup');
const NAME_INPUT = POPUP.querySelector('.popup__input_type_name');
const JOB_INPUT = POPUP.querySelector('.popup__input_type_profession');
const SUBMIT_BUTTON = POPUP.querySelector('.popup__button_type_submit');
const CLOSE_BUTTON = POPUP.querySelector('.popup__button_type_close');


function openPopup() {
  POPUP.classList.add('popup_visible');
}

function closePopup() {
  POPUP.classList.remove('popup_visible');
  EDIT_BUTTON_PROFILE.addEventListener('click', handleEditProfile);
}

function submitPopup() {
  NAME_PROFILE.textContent = NAME_INPUT.value;
  JOB_PROFILE.textContent = JOB_INPUT.value;

  closePopup();
}

function handleEditProfile(evt) {
  evt.preventDefault();
  NAME_INPUT.value = NAME_PROFILE.textContent;
  JOB_INPUT.value = JOB_PROFILE.textContent;

  CLOSE_BUTTON.addEventListener('click', closePopup);
  SUBMIT_BUTTON.addEventListener('click', submitPopup);

  openPopup()
}


EDIT_BUTTON_PROFILE.addEventListener('click', handleEditProfile);
