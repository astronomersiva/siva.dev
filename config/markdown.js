function getAttributes(tagContents) {
  let attributesRegex = /(\w+)="([\s\w,.\-_/@:;]+)"/g;
  let attributeMap = {};

  let attributes = tagContents.match(attributesRegex);
  for (let attribute of attributes) {
    let [key, value] = attribute.split('=');
    attributeMap[key] = value.replace(/"/g, '');
  }

  return attributeMap;
}

module.exports = {
  containers: [
    {
      name: 'lazy-image',
      options: {
        validate: function(params) {
          return params.endsWith(':::') && params.includes('lazy-image');
        },

        render: function(tokens, idx) {
          let statement = tokens[idx];

          if (statement.type === 'container_lazy-image_open') {
            let tagContents = statement.info.replace(':::', '').trim();
            let attributeMap = getAttributes(tagContents);
            let style = attributeMap.style;
            let styleMarkup = style ? `style="${style}"` : '';
            return `
              <div class="ajanta" ${styleMarkup}>
                <img
                  inline
                  class="img-responsive center-block pixelated blur"
                  src="${attributeMap.src}"
                  data-src="${attributeMap.dSrc || attributeMap.src.replace('lowres/', '')}"
                  alt="${attributeMap.alt}">
              
                <img class="img-responsive center-block original">
              </div>
              <noscript>
                <img
                  class="img-responsive center-block"
                  src="${attributeMap.dSrc || attributeMap.src.replace('lowres/', '')}"
                  alt="${attributeMap.alt}">
              </noscript>
            `;
          }

          return '';
        }
      }
    },
    {
      name: 'video',
      options: {
        validate: function(params) {
          return params.endsWith(':::') && params.includes('video');
        },

        render: function(tokens, idx) {
          let statement = tokens[idx];

          if (statement.type === 'container_video_open') {
            let tagContents = statement.info.replace(':::', '').trim();
            let attributeMap = getAttributes(tagContents);
            return `
              <video
                controls
                preload
                muted
                playsinline
                src="${attributeMap.src}"
                type="video/mp4"
                style="max-width: 100%;"
              >
              </video>
            `;
          }

          return '';
        }
      }
    }
  ]
};
