require('dotenv').config();

const staticNotes = require('./_static-notes.js');
const { createClient } = require('@supabase/supabase-js');

const MarkdownRenderer = require('@astronomersiva/lego/lib/utils/MarkdownRenderer');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const mdRenderer = new MarkdownRenderer();

async function loadNotes() {
  let { data: dynamicNotes, error } = await supabase
    .from('notes')
    .select('date, link, links, title, content, tags, id')
    .order('date', { ascending: true });

  if (error) {
    throw error;
  }

  dynamicNotes.forEach((note) => {
    // split and convert to capitalized words
    note.tags = note.tags.split(',').map((tag) => tag.trim().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    // todo: refactor old code to use links instead of link
    if (note.links) {
      note.links = note.links.split(',').map((link) => link.trim());
    }
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
    let content = mdRenderer.renderMarkdown(note.content || '').html;

    return {
      ...note,
      content,
      title: note.title && note.title.replace(regex, '<code>$1</code>'),
    };
  });

  return formattedNotes;
}

module.exports = loadNotes();
