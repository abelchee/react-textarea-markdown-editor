import React, { useState } from 'react';
import './App.css';
import TextareaMarkdownEditor from 'react-textarea-markdown-editor';
import languages from './lang';
import linkIcon from './icon/link.svg';
import orderedListIcon from './icon/ordered-list.svg';
import tableIcon from './icon/table.svg';
import unorderedListIcon from './icon/unordered-list.svg';
import youtubeIcon from './icon/youtube.svg';

const md = require('markdown-it')({}).use(require('markdown-it-video'),
  {
    youtube: { width: 640, height: 390 },
    vimeo: { width: 500, height: 281 },
    vine: { width: 600, height: 600, embed: 'simple' },
    prezi: { width: 550, height: 400 },
  },
);

function App () {
  const [language, setLang] = useState('en');

  const markers = [
    {
      key: 'header',
      markers: [
        {
          key: 'header',
          markers: [
            {
              key: 'h1',
              marker: '# ',
              name: <b>H1</b>,
              title: languages[language].header1,
              type: 'line-marker',
            },
            {
              key: 'h2',
              marker: '## ',
              name: <b>H2</b>,
              title: languages[language].header2,
              type: 'line-marker',
            },
            {
              key: 'h3',
              marker: '### ',
              name: <b>H3</b>,
              title: languages[language].header3,
              type: 'line-marker',
            },
            {
              key: 'h4',
              marker: '#### ',
              name: <b>H4</b>,
              title: languages[language].header4,
              type: 'line-marker',
            },
          ],
          type: 'dropdown',
        },
      ],
      type: 'group',
    },
    {
      key: 'text',
      markers: [
        {
          key: 'text',
          markers: [
            {
              defaultText: 'bold',
              key: 'bold',
              name: <b>{languages[language].bold}</b>,
              prefix: '**',
              suffix: '**',
              title: languages[language].bold,
              type: 'marker',
            },
            {
              defaultText: 'italic',
              key: 'italic',
              name: <i>{languages[language].italic}</i>,
              prefix: '*',
              suffix: '*',
              title: languages[language].italic,
              type: 'marker',
            },
            {
              defaultText: 'strikethrough',
              key: 'strikethrough',
              name: <del>{languages[language].strikethrough}</del>,
              prefix: '~~',
              suffix: '~~',
              title: languages[language].strikethrough,
              type: 'marker',
            },
            {
              key: 'blockquote',
              marker: '> ',
              name: languages[language].blockquote,
              title: languages[language].blockquote,
              type: 'line-marker',
            },
            {
              defaultText: 'inline code',
              key: 'inline-code',
              name: languages[language].inlineCode,
              prefix: '`',
              suffix: '`',
              title: languages[language].inlineCode,
              type: 'marker',
            },
            {
              defaultText: 'code',
              key: 'code',
              multipleLine: true,
              name: languages[language].code,
              prefix: '```',
              suffix: '```',
              title: languages[language].code,
              type: 'marker',
            },
            {
              key: 'hr',
              multipleLine: true,
              name: <hr style={{ width: '100%' }}/>,
              template: '---',
              title: languages[language].hr,
              type: 'template',
            },
          ],
          type: 'dropdown',
        },
      ],
      type: 'group',
    },
    {
      key: 'list',
      markers: [
        {
          key: 'unordered-list',
          marker: '* ',
          name: <img alt="" src={unorderedListIcon}/>,
          title: languages[language].unorderedList,
          type: 'line-marker',
        },
        {
          key: 'ordered-list',
          marker: '1. ',
          name: <img alt="" src={orderedListIcon}/>,
          title: languages[language].orderedList,
          type: 'line-marker',
        },
        {
          key: 'table',
          multipleLine: true,
          name: <img alt="" src={tableIcon}/>,
          template: `| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |`,
          title: languages[language].table,
          type: 'template',
        },
      ],
      type: 'group',
    },
    {
      key: 'additional',
      markers: [
        {
          defaultText: 'text',
          key: 'link',
          name: <img alt="" src={linkIcon}/>,
          prefix: '[',
          suffix: '](url)',
          title: languages[language].link,
          type: 'marker',
        },
        {
          defaultText: 'YMmdQw17TU4',
          key: 'youtube',
          name: <img alt="" src={youtubeIcon}/>,
          prefix: '@[youtube](',
          suffix: ')',
          title: languages[language].youtube,
          type: 'marker',
        },
      ],
      type: 'group',
    },
  ];

  return (
    <div className="App">
      <button type="button" onClick={() => setLang('en')}>English</button>
      <button type="button" onClick={() => setLang('zh')}>简体中文</button>
      <br/>
      <br/>

      <TextareaMarkdownEditor language={language} id="2222" rows={10}/>
      <hr/>
      <TextareaMarkdownEditor markers={markers} language={language} id="111111" rows={10}
                              doParse={text => md.render(text)}/>
    </div>
  );
}

export default App;
