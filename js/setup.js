'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

window.setupDialogElement = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupWizardForm = document.querySelector('.setup-wizard-form');
var setupWizardName = document.querySelector('.setup-user-name');
var setupClose = setupWizardForm.querySelector('.setup-close');
var wizardCoatsColor = document.querySelector('.wizard-coat');
var wizardCoatsColorValue = setupWizardForm.querySelector('input[name="coat-color"]');
var wizardEyesColor = document.querySelector('.wizard-eyes');
var wizardEyesColorValue = setupWizardForm.querySelector('input[name="eyes-color"]');
var fireBallBlock = document.querySelector('.setup-fireball-wrap');
var wizardFireBallColor = fireBallBlock.querySelector('.setup-fireball');
var wizardFireBallValue = fireBallBlock.querySelector('input[name=fireball-color]');

var WIZARDS_AMOUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var initCoord;

// Функция генерации случайного индекса массива
var getRandomValueFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Функция создания массива объектов
var createWizards = function () {
  var wizards = {
    name: WIZARD_NAMES[Math.floor(Math.random() * (WIZARD_NAMES.length))] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * (WIZARD_SURNAMES.length))],
    coatsColor: COATS_COLOR[Math.floor(Math.random() * (COATS_COLOR.length))],
    eyesColor: EYES_COLOR[Math.floor(Math.random() * (EYES_COLOR.length))]
  };
  return wizards;
};

// Нахожу класс у которого нужно удалить 'hidden' и удаляю 'hidden'
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Нахожу класс куда буду добавлять копии и шаблон
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Функция клонирования элементов с разными объектами массива
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatsColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
// Цикл, запускающий создание массова объектов, клонирование элементов и вставку на страницу
for (var i = 0; i < WIZARDS_AMOUNT; i++) {
  fragment.appendChild(renderWizard(createWizards()));
}

// Делаю видимыми копии волшебников
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupWizardName) {
    closePopup();
  }
};

// Функция открывания окна настроек(удаляю класс 'hidden')
var openPopup = function () {
  setupWizardForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  initCoord = {
    x: window.setupDialogElement.offsetLeft + 'px',
    y: window.setupDialogElement.offsetTop + 'px'
  };
};

// Объявляю функции взаимодействия
var closePopup = function () {
  setupWizardForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  window.setupDialogElement.style.left = initCoord.x;
  window.setupDialogElement.style.top = initCoord.y;
};

var changeCoatsColor = function () {
  wizardCoatsColor.style.fill = getRandomValueFromArray(COATS_COLOR);
  wizardCoatsColorValue.value = wizardCoatsColor.style.fill;
};

var changeEyesColor = function () {
  wizardEyesColor.style.fill = getRandomValueFromArray(EYES_COLOR);
  wizardEyesColorValue.value = wizardEyesColor.style.fill;
};

var changeFireBallsColor = function () {
  fireBallBlock.style.background = getRandomValueFromArray(FIREBALLS);
  wizardFireBallValue.value = fireBallBlock.style.background;
};

// Добавляю события на страницу
setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoatsColor.addEventListener('click', changeCoatsColor);
wizardEyesColor.addEventListener('click', changeEyesColor);
wizardFireBallColor.addEventListener('click', changeFireBallsColor);
