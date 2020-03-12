let modal = document.querySelector('.modal');
let modalImage = document.querySelector('.modal-image');
let modalDesc = document.querySelector('.modal-desc');

window.onhashchange = function() {
  if (!location.hash) {
    closeModal();
  }
}

function openModal(imageSrc, description) {
  modalImage.src = getCDNUrl(imageSrc);
  modalImage.alt = description;
  modalDesc.textContent = description;

  modalImage.onerror = function() {
    modalImage.src = imageSrc;
    modalImage.onerror = null;
  }

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
