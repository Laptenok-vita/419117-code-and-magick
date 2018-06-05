'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var PARCEL_WIDTH = 20;
var PARCEL_HEIGHT = 270;

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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderParcel = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, PARCEL_WIDTH, PARCEL_HEIGHT);
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
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(72,46,0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderParcel(ctx, 90, 10, 'rgb(72,46,0)');
  renderParcel(ctx, 520, 10, 'rgb(72,46,0)');
  ctx.fillStyle = '#00F';
  ctx.font = 'FONT_HEIGHT PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, Вы победили!', CLOUD_X + FONT_GAP * 2, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP * 2, (CLOUD_Y + FONT_GAP) * 2);

  var maxTime = getMaxElement(times);

  var colorColumn = 'rgba(0, 0, ' + (Math.floor(256 * Math.random())) + ', 1)';

  for (var i = 0; i < names.length; i++) {
    names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = colorColumn;

    ctx.fillText(names[i], COLUMN_X + COLUMN_GAP * i, COLUMN_Y + GAP);
    ctx.fillRect(COLUMN_X + COLUMN_GAP * i, COLUMN_Y, COLUMN_WIDTH, -(columnHeight * times[i]) / maxTime);
  }
};
