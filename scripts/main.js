const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY_CODE = 27;

// set the detail image and title
function setDetails(imageUrl, titleText) {
  'use strict';
  let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

// get the detail image and title from a thumbnail
function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault(); // stop the browser following the href link
    setDetailsFromThumb(thumb);
    showDetails(); // show the big detail Image
  });
}

function getThumbnailsArray() {
  'use strict';
  let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  let thumbnailArray = [].slice.call(thumbnails); // convert the NodeList to an array
  return thumbnailArray;
}

// add the CSS class to <body> to hide the detail image
function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

// remove the CSS class from <body> to show the detail image
function showDetails() {
  'use strict';
  let frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY_CODE) {
      hideDetails();
    }
  });
}

function initializeEvents() {
  'use strict';
  let thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();