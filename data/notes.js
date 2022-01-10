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
    date: 'August 24, 2021',
    tags: ['Puppeteer', 'JavaScript', 'Code']
  }, {
    title: 'Choosing the right gear for planetary astrophotography',
    content: 'Try and hit a focal ratio of `5 x pixel size`. You may need a Barlow to hit this number.',
    link: 'https://www.cloudynights.com/topic/700833-why-does-the-f-num-5x-pixel-size-apply-for-colour-cameras/',
    id: 'planetary-cam',
    date: 'August 24, 2021',
    tags: ['Astrophotography']
  }, {
    title: 'Why does sunlight come from the north in shaded relief maps?',
    content: 'How maps work around the shortcomings of human perception.',
    link: 'https://ramblemaps.com/why-does-sunlight-come-from-north',
    id: 'sunlight-maps',
    date: 'August 29, 2021',
    tags: ['General']
  }, {
    title: 'Hysteresis Effect',
    link: 'https://github.com/dotnet/runtime/issues/51935?WT.mc_id=-blog-scottha#issuecomment-832140430',
    date: 'September 29, 2021',
    id: 'hysterisis-effect',
    tags: ['Code']
  }, {
    title: 'The Geosophy Newsletter by Devyani Khare',
    link: 'https://www.devayanikh.com/geosophy',
    date: 'December 5, 2021',
    id: 'geosophy-newsletter',
    tags: ['General']
  }, {
    link: 'https://www.sikkimproject.org/category/archive/',
    content: 'The aim of Sikkim Project: The Land and its People is to highlight the physical beauty of the land and to explore how nature and its positioning played a significant role in the formation of identities of different communities.', 
    title: 'Sikkim Project Archives',
    date: 'December 18, 2021',
    id: 'sikkim-project',
    tags: ['General']
  }, {
    link: 'https://stackoverflow.blog/2021/12/27/dont-push-that-button-exploring-the-software-that-flies-spacex-starships/',
    title: 'Don\'t push that button! Exploring the software that flies SpaceX\'s ships',
    date: 'December 27, 2021',
    id: 'spacex',
    tags: ['Code']
  }, {
    link: 'https://twitter.com/shuding_/status/1475916082875666441',
    content: 'A nice thread on how the globe on Vercel\`s homepage was built.',
    title: '5kB WebGL globe lib.',
    date: 'December 29, 2021',
    id: 'globe-lib',
    tags: ['Code', 'JavaScript']
  }, {
    link: 'https://github.blog/2020-12-21-how-we-built-the-github-globe/',
    title: 'How we built the GitHub globe',
    date: 'December 29, 2021',
    id: 'github-globe',
    tags: ['Code', 'JavaScript']
  }, {
    content: 'If Ilex aquifolium finds its leaves being nibbled by deer, it switches genes on to make them spiky when they regrow. So on taller Holly trees, the upper leaves(which are out of reach) have smooth edges, while the lower leaves are prickly.',
    title: 'The prickly question of holly leaves',
    date: 'December 31, 2021',
    id: 'holly-leaves',
    links: [
      'https://twitter.com/LeifBersweden/status/1476609093297131522',
      'https://naturenet.net/blogs/2009/01/12/the-prickly-question-of-holly-leaves/',
    ],
    tags: ['General']
  }, {
    link: 'https://twitter.com/jaffathecake/status/1480493540350341121',
    title: '`event.key` isn\'t set when using the default Android on-screen keyboard.',
    date: 'January 10, 2022',
    id: 'android-keyboard',
    tags: ['Code', 'JavaScript', 'Android']
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
