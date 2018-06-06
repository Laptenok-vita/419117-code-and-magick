'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var COLUMN_X = 155;
var COLUMN_Y = 245;
var COLUMN_WIDTH = 40;
var FONT_GAP = 16;
var FONT_HEIGHT = 16;
var columnHeight = CLOUD_HEIGHT - FONT_HEIGHT * 3 - FONT_GAP * 4;
var COLUMN_GAP = 80;

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  ctx.fillStyle = 'rgba(21, 13, 0, 1)';
  ctx.font = 'FONT_HEIGHT PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, Вы победили!', CLOUD_X + FONT_GAP * 2, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP * 2, (CLOUD_Y + FONT_GAP) * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var calculateColor = function () {
      var colorColumn = 'rgba(0, 0, ' + (Math.floor(256 * Math.random())) + ', 1)';
      return colorColumn;
    };

    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : calculateColor();

    ctx.fillText(names[i], COLUMN_X + COLUMN_GAP * i, COLUMN_Y + GAP);
    ctx.fillRect(COLUMN_X + COLUMN_GAP * i, COLUMN_Y, COLUMN_WIDTH, -(columnHeight * times[i]) / maxTime);
  }
};
