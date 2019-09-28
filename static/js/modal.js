let modal = document.querySelector('.modal');
let modalImage = document.querySelector('.modal-image');
let modalDesc = document.querySelector('.modal-desc');

const isWebpSupported = document.getElementsByTagName('html')[0].className.includes('webp');

window.onhashchange = function() {
  if (!location.hash) {
    closeModal();
  }
}

function openModal(imageSrc, webpSrc, description) {
  modalImage.src = isWebpSupported && webpSrc ? webpSrc : imageSrc;
  modalImage.alt = description;
  modalDesc.textContent = description;

  modal.style.display = 'grid';
  document.body.style.overflowY = 'hidden';

  window.location.hash = encodeURI(description);
}

function closeModal() {
  modalImage.src = '';
  modalImage.alt = '';
  modalDesc.textContent = '';

  modal.style.display = 'none';
  document.body.style.overflowY = 'auto';

  // TODO: feels a little hackish, leaves one extra entry in the forward direction
  history.pushState('', document.title, window.location.pathname);
  window.history.back();
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    window.history.back();
  }
};
