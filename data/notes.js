require('dotenv').config();

const staticNotes = require('./_static-notes.js');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadNotes() {
  let { data: dynamicNotes, error } = await supabase
    .from('notes')
    .select('date, link, title, content, tags, id')
    .order('date', { ascending: true });

  if (error) {
    throw error;
  }

  dynamicNotes.forEach((note) => {
    // split and convert to capitalized words
    note.tags = note.tags.split(',').map((tag) => tag.trim().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    // change timestamp to Month Day, Year
    note.date = new Date(note.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  });

  // sort and combine both
  const notes = [...staticNotes, ...dynamicNotes].sort((a, b) => new Date(a.date) - new Date(b.date));

  const regex = /`([a-zA-Z0-9\.\-\_\(\)\:\'\"\s]+)`/g;
  const formattedNotes = notes.map(note => {
    return {
      ...note,
      title: note.title && note.title.replace(regex, '<code>$1</code>'),
      content: (note.content || '').replace(regex, '<code>$1</code>'),
    };
  });

  return formattedNotes;
}

module.exports = loadNotes();
