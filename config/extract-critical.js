module.exports = {
  inline: true,
  dimensions: [
    {
      height: 800,
      width: 470
    }, {
      height: 900,
      width: 1200
    }
  ],
  penthouse: {
    timeout: 150000,
    forceInclude: [
      '.dark-mode>body',
      '.dark-mode .header-post',
      '.dark-mode header[class*=header-post-]',
      '.dark-mode .header-home',
      '.dark-mode .wrapper-white',
      '.dark-mode-star',
      '.wrapper-white',
      'html.dark-mode'
    ]
  }
};
