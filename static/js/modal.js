let modal = document.querySelector('.modal');
let modalImage = document.querySelector('.modal-image');
let modalDesc = document.querySelector('.modal-desc');

function openModal(image, description) {
  modalImage.src = image;
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
