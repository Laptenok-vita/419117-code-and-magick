'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARDS_AMOUNT = 4;

// Функция создания массива объектов
var createWizards = function () {
  var wizards = {
    name: WIZARD_NAMES[Math.floor(Math.random() * (WIZARD_NAMES.length))] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * (WIZARD_SURNAMES.length))],
    coatsColor: COATS_COLOR[Math.floor(Math.random() * (COATS_COLOR.length))],
    eyesColor: EYES_COLOR[Math.floor(Math.random() * (EYES_COLOR.length))]
  };
  return wizards;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

// Цикл, запускающий создание массова объектов, клонирование элементов и вставку на страницу
for (var i = 0; i < WIZARDS_AMOUNT; i++) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderWizard(createWizards()));
  similarListElement.appendChild(fragment);
}

userDialog.querySelector('.setup-similar').classList.remove('hidden');
