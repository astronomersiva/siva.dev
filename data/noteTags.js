async function getNoteTags() {
  let notes = await require('./notes');

  let tags = notes.reduce((acc, note) => {
    note.tags.forEach(tag => {
      if (acc.indexOf(tag) === -1) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  tags = tags.sort();

  return tags;
};

module.exports = getNoteTags();
