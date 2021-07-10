import {createMockData} from './data.js';
import {addElementToDom} from './utils.js';

const elMap = document.querySelector('.map');
const elMapPinsArea = elMap.querySelector('.map__pins');

const elPinTemplate = document.querySelector('#pin').content.querySelector('button');

const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;

const createPinElement = function (pinData) {
  const elPin = elPinTemplate.cloneNode(true);

  elPin.style.left = `${pinData.location.x - PIN_WIDTH / 2  }px`;
  elPin.style.top = `${pinData.location.y + PIN_HEIGHT  }px`;
  elPin.id = pinData.offer.id;
  elPin.setAttribute('aria-type', pinData.offer.type);
  elPin.setAttribute('aria-price', pinData.offer.price);
  elPin.setAttribute('aria-rooms', pinData.offer.rooms);
  elPin.setAttribute('aria-guests', pinData.offer.guests);
  elPin.setAttribute('aria-features', pinData.offer.features);
  const elMapPinImage = elPin.querySelector('img');
  if (elMapPinImage) {
    elMapPinImage.src = pinData.author.avatar;
    elMapPinImage.alt = pinData.offer.title;
  }

  return elPin;
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
// const housingPrice = mapFilters.querySelector('#housing-price');
// const housingRooms = mapFilters.querySelector('#housing-rooms');
// const housingGuests = mapFilters.querySelector('#housing-guests');
// const housingFeatures = mapFilters.querySelector('#housing-features');

// const removePins = function () {
//   const mapPins = document.querySelector('.map__pins');
//   mapPins.forEach((item) => {
//     elMap.removeChild(item);
//   });
// };

const createMapPins = function () {
  const arrMockData = createMockData();

  if (elMapPinsArea && elPinTemplate) {
    for (let i = 0; i < arrMockData.length; i++) {
      addElementToDom(elMapPinsArea, createPinElement(arrMockData[i]));

      housingType.addEventListener('change', (event) => {
        const mainPins = document.querySelector('.map__pins');
        const pins = Array.from(document.querySelectorAll('.map__pin'));
        pins.forEach((pin) => {
          pin.hidden = false;
        });

        const { type } = housingType.value;
        console.log(type);
        const pinsByType = mainPins.querySelector(`[aria-type="${type}"]`);
        pinsByType.hidden = true;
        // if(housingType.value == 'bungalo')
        // {
        //   console.log(housingType.value);
        // } else if(housingType.value == 'palace') {
        //   console.log(housingType.value);
        // } else if(housingType.value == 'flat') {
        //   console.log(housingType.value);
        // } else if(housingType.value == 'house') {
        //   console.log(housingType.value);
        // }
      });


      //else if (evt.target.id === 'filter-popular') {
      //   window.gallery.renderPhotosArr(photos);
      // } else if (evt.target.id === 'filter-discussed') {
      //   const discussedPhotos = sortDiscussed();
      //   window.gallery.renderPhotosArr(discussedPhotos);
      // }

    }
  }
};


export { createMapPins };

