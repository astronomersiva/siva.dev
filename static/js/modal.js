let modal = document.querySelector('.modal');
let modalImage = document.querySelector('.modal-image');
let modalDesc = document.querySelector('.modal-desc');

const isWebpSupported = document.getElementsByTagName('html')[0].className.includes('webp');

function openModal(imageSrc, webpSrc, description) {
  modalImage.src = isWebpSupported ? webpSrc : imageSrc;
  modalImage.alt = description;
  modalDesc.textContent = description;

  modal.style.display = 'grid';
  document.body.style.overflowY = 'hidden';
}

function closeModal() {
  modalImage.src = '';
  modalImage.alt = '';
  modalDesc.textContent = '';

  modal.style.display = 'none';
  document.body.style.overflowY = 'auto';
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    closeModal();
  }
};
