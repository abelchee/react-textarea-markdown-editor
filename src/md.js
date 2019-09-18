const md = require('markdown-it')({}).use(require('markdown-it-video'),
  {
    youtube: { width: 640, height: 390 },
    vimeo: { width: 500, height: 281 },
    vine: { width: 600, height: 600, embed: 'simple' },
    prezi: { width: 550, height: 400 },
  },
);

export default md;
