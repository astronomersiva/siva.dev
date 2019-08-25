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
    },
    {
      name: 'youtube',
      options: {
        validate: function(params) {
          return params.endsWith(':::') && params.includes('youtube');
        },

        render: function(tokens, idx) {
          let statement = tokens[idx];

          if (statement.type === 'container_youtube_open') {
            let tagContents = statement.info.replace(':::', '').trim();
            let attributeMap = getAttributes(tagContents);
            return `
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/${attributeMap.id}"
                srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,
                body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}
                span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;
                text-shadow:0 0 0.5em black}</style>
                <a href=https://www.youtube.com/embed/${attributeMap.id}?autoplay=1>
                <img src=https://img.youtube.com/vi/${attributeMap.id}/hqdefault.jpg alt='${attributeMap.title}'><span>▶</span></a>"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                rel=0
                title="${attributeMap.title}"
              ></iframe>
            `;
          }

          return '';
        }
      }
    }
  ]
};
