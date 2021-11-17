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

function submitPopup() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup();
}

function handleEditProfile(evt) {
  evt.preventDefault();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  closeButton.addEventListener('click', closePopup);
  submitButton.addEventListener('click', submitPopup);

  openPopup()
}


editButtonProfile.addEventListener('click', handleEditProfile);
