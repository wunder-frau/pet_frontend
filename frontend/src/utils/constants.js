import avatar from '../images/avatar.jpg'
import likeActive from '../images/like__active.svg'
import Like from '../images/like.svg'
import logo from '../images/logo.svg'
import pen from '../images/pen.svg'
import plus from '../images/plus.svg'
import trashActive from '../images/Trash_active.svg'
import trash from '../images/Trash.svg'

export const buttonSavingText = document.querySelector('.form__submit')
export const elementsList = document.querySelector('.elements__list');
export const inputAvatarLink = document.querySelector('.form__input_type_avatar-link');
export const inputDescrtiptionId = document.querySelector('#input-about');
export const inputNameId = document.querySelector('#input-name');
export const openAddCardPopupBtn = document.querySelector('.profile__add');
export const openEditProfilePopupBtn = document.querySelector('.profile__edit');
export const openEditAvatarPopupBtn = document.querySelector('.profile__avatar-overlay');
export const popupCardSelector = document.querySelector('.popup_type_add');
export const popupProfileSelector = document.querySelector('.popup_type_edit');
export const popupAvatarSelector = document.querySelector('.popup_type_edit-avatar');
export const formInputCardName = document.querySelector('.form__input_type_card-name');
export const formInputCardLink = document.querySelector('.form__input_type_card-link');

// validation functionality need to be finished in the future, it is done in vanila.js version
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__close_invalid',
  inputErrorClass: 'form__input_active',
  errorClass: 'error_visible'
};

export const imagesList = [
  { name: 'avatar', image: avatar },
  { name: 'likeActive', link: likeActive },
  { name: 'Like', link: Like },
  { name: 'logo', link: logo },
  { name: 'pen', link: pen },
  { name: 'plus', link: plus },
  { name: 'trashActive', link: trashActive },
  { name: 'trash', link: trash },
];



