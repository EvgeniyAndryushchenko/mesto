const validationForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Сброс полей формы после ошибок

class FormValidator {
  constructor(data) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  resetInputError (formElement) {
    this.inputList = Array.from(formElement.querySelectorAll(this._inputSelector));

    this.inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement);
    });
  }

// Отображение ошибок валидации

  _showInputError (formElement, inputElement) {
    inputElement.addEventListener('input', function (evt) {
      evt.preventDefault();
    });
    this.errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this.errorElement.textContent = this._errorMessage;
    this.errorElement.classList.add(this._errorClass);
  }

  _hideInputError (formElement, inputElement) {
    this.errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this.errorElement.classList.remove(this._errorClass);
    this.errorElement.textContent = '';
  }

  _checkInputValidity (formElement, inputElement) {
    console.log(formElement);
    console.log(inputElement);
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
  }

// Активация и деактивация кнопки Submit

  disableSubmitButton (buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  enableSubmitButton (buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this.enableSubmitButton(buttonElement);
    }
  }

  // Установка слушателей на поля ввода

  _setEventListeners (formElement) {
    this.inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this.buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(this.inputList, this.buttonElement);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        console.log(formElement);
        console.log(inputElement);
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(this.inputList, this.buttonElement);
      });
    });
  }


  enableValidation() {
    this.formList = Array.from(document.querySelectorAll(this._formSelector));
    this.formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }
}


export {validationForm, FormValidator};
