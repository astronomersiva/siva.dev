module.exports = [
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
  }, {
    link: 'https://hacks.mozilla.org/2021/08/mdns-autocomplete-search/',
    title: `How MDN’s autocomplete search works`,
    date: 'January 11, 2022',
    id: 'mdn-autocomplete',
    tags: ['Code', 'JavaScript']
  }, {
    link: 'https://www.youtube.com/watch?v=dz6aFfme_hg',
    title: 'Stephanie Eckles – Minimal CSS Solutions to (Previously) Complex Problems | CSSCafe',
    date: 'January 12, 2022',
    id: 'csscafe',
    tags: ['CSS', 'Code']
  }, {
    link: 'https://wiki.csswg.org/ideas/mistakes',
    title: 'Incomplete List of Mistakes in the Design of CSS',
    date: 'January 18, 2022',
    id: 'css-mistakes',
    tags: ['CSS', 'Code']
  }, {
    link: 'https://github.com/astronomersiva/chrome-issue-reproduction',
    title: 'The weirdest Chrome bug I\'ve ever seen',
    content: 'Reverse input/textarea after selecting their contents with the mouse.',
    date: 'February 12, 2022',
    id: 'chrome-issue',
    tags: ['Code']
  }, {
    link: 'https://addyosmani.com/blog/preload-hero-images/',
    title: 'Preload late-discovered Hero images faster',
    date: 'February 16, 2022',
    id: 'preload-hero-images',
    tags: ['Code']
  }, {
    link: 'https://twitter.com/DanHollick/status/1468958644364402702',
    title: 'WCAG 3 will use a new color contrast method called APCA',
    date: 'February 21, 2022',
    id: 'apca',
    tags: ['Code']
  }, {
    link: 'https://blog.kobadoo.com/2022/02/the-only-flag-of-world-that-is-shredded.html',
    title: 'The only flag of the world that is shredded',
    date: 'February 25, 2022',
    id: 'shredded-flag',
    tags: ['General']
  }, {
    link: 'https://journals.openedition.org/emscat/2647',
    title: 'An archaeological survey of the Nubra Region',
    date: 'March 1, 2022',
    id: 'nubra-archaeology',
    tags: ['General']
  }, {
    link: 'https://www.jstor.org/stable/1778919?refreqid=excelsior:f32b61eb7b5a84a012ff3bd28520fe7c',
    title: 'The Exploration of the Siachen or Rose Glacier, Eastern Karakoram',
    date: 'March 7, 2022',
    id: 'siachen-glacier',
    tags: ['General']
  }, {
    link: 'https://twitter.com/AaronJCorcoran/status/1509954726137249795',
    title: 'Darwin\'s Hawkmoth responds to bat ultrasound at sonar-jamming rates',
    date: 'April 3, 2022',
    id: 'darwin-hawkmoth',
    tags: ['General']
  }
];
