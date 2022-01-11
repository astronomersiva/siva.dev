function toggleTag(tag) {
  let tagElement = document.querySelector(`[data-tag="${tag}"]`);
  tagElement.classList.contains('active') ? tagElement.classList.remove('active') : tagElement.classList.add('active');

  filter();
}

function filter() {
  let activeTags = Array.from(document.querySelectorAll(`[data-tag].active`)) || [];
  activeTags = activeTags.map(tag => tag.getAttribute('data-tag').toUpperCase()).filter(Boolean) || [];
  let notes = document.getElementsByClassName('note');

  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let tags = note.getAttribute('data-tags').toUpperCase().split('|').filter(Boolean);

    if (activeTags.length) {
      for (let j = 0; j < activeTags.length; j++) {
        if (tags.includes(activeTags[j])) {
          note.style.display = '';
          break;
        } else {
          note.style.display = 'none';
        }
      }
    } else {
      note.style.display = 'none';
    }
  }
}
