const notes = [
  {
    title: '`async` functions may not work while using `page.evaluate` in Puppeteer.',
    link: 'https://github.com/puppeteer/puppeteer/issues/1665#issuecomment-354241717',
    content: 'This was a surprising bug. \
      Turns out, Puppeteer serializes these functions using `Function.prototype.toString()`. \
      Babel, and other transpilers, change the code in such a way that this no longer works. \
      The solution is to pass the function as a template literal or configure the transpiler \
      to use the latest ecma version(`"target": "es2018"`). \
    ',
    id: 'puppeteer-async',
    date: 'August 24, 2021'
  }, {
    title: 'Choosing the right gear for planetary astrophotography',
    content: 'Try and hit a focal ratio of `5 x pixel size`. You may need a Barlow to hit this number.',
    link: 'https://www.cloudynights.com/topic/700833-why-does-the-f-num-5x-pixel-size-apply-for-colour-cameras/',
    id: 'planetary-cam',
    date: 'August 24, 2021'
  }, {
    title: 'Why does sunlight come from the north in shaded relief maps?',
    content: 'How maps work around the shortcomings of human perception.',
    link: 'https://ramblemaps.com/why-does-sunlight-come-from-north',
    id: 'sunlight-maps',
    date: 'August 29, 2021'
  }, {
    title: 'Hysteresis Effect',
    link: 'https://github.com/dotnet/runtime/issues/51935?WT.mc_id=-blog-scottha#issuecomment-832140430',
    date: 'September 29, 2021',
    id: 'hysterisis-effect'
  }, {
    title: 'The Geosophy Newsletter by Devyani Khare',
    link: 'https://www.devayanikh.com/geosophy',
    date: 'December 5, 2021',
    id: 'geosophy-newsletter'
  }
];

const regex = /`([a-zA-Z0-9\.\-\_\(\)\:\'\"\s]+)`/g;
const formattedNotes = notes.map(note => {
  return {
    ...note,
    title: note.title && note.title.replace(regex, '<code>$1</code>'),
    content: (note.content || '').replace(regex, '<code>$1</code>'),
  };
});

module.exports = formattedNotes;
