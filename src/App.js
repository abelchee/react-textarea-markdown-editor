import React, { useState, useRef } from 'react';
import './App.css';
import TextareaMarkdownEditor from 'react-textarea-markdown-editor';
import languages from './lang';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import FileReader from 'promise-file-reader';

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
  const [images, setImages] = useState([]);

  const editorRef = useRef(null);

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
          name: <Icon name="list ul" fitted size="large"/>,
          title: languages[language].unorderedList,
          type: 'line-marker',
        },
        {
          key: 'ordered-list',
          marker: '1. ',
          name: <Icon name="list ol" fitted size="large"/>,
          title: languages[language].orderedList,
          type: 'line-marker',
        },
        {
          key: 'table',
          multipleLine: true,
          name: <Icon name="table" fitted size="large"/>,
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
          name: <Icon name="linkify" fitted size="large"/>,
          prefix: '[',
          suffix: '](url)',
          title: languages[language].link,
          type: 'marker',
        },
        {
          defaultText: 'YMmdQw17TU4',
          key: 'youtube',
          name: <Icon name="youtube play" fitted size="large"/>,
          prefix: '@[youtube](',
          suffix: ')',
          title: languages[language].youtube,
          type: 'marker',
        },
        {
          key: 'images',
          markers: [
            {
              key: 'dummy',
              name: <Icon name="image" fitted size="large"/>,
              template: '![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")',
              title: languages[language].image,
              type: 'template',
            },
            ...images.map((data, index) => ({
              defaultText: 'alt text',
              key: `image${index + 1}`,
              name: `image${index + 1}`,
              prefix: '![',
              suffix: `][image${index + 1}]`,
              title: `image${index + 1}`,
              type: 'marker',
            })),
          ],
          type: 'dropdown',
        },
      ],
      type: 'group',
    },
  ];

  async function onPaste (e) {
    if (!e.clipboardData) {
      return;
    }
    const items = e.clipboardData.items;
    if (!items) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf('image') === -1) continue;
      // Retrieve image on clipboard as blob
      const file = items[i].getAsFile();
      console.log(items[i]);
      if (file) {
        e.persist();
        e.preventDefault();
        e.stopPropagation();
        // File name
        console.log(e.clipboardData.getData('Text'));
        const data = await FileReader.readAsDataURL(file);
        console.log(data);
        editorRef.current.mark('![', `][image${images.length + 1}]`, 'alt text');
        setImages([...images, data]);
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  return (
    <Container>
      <button type="button" onClick={() => setLang('en')}>English</button>
      <button type="button" onClick={() => setLang('zh')}>简体中文</button>

      <Divider horizontal>
        <Header as='h4'>
          <Icon name='tag'/>
          Default
        </Header>
      </Divider>
      <TextareaMarkdownEditor language={language} id="2222" rows={10} doParse={text => md.render(text)}/>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='tag'/>
          Customized
        </Header>
      </Divider>
      <TextareaMarkdownEditor ref={editorRef} markers={markers} language={language} id="111111" rows={10}
                              placeholder="You can paste your image here!"
                              doParse={text => md.render(`${text}\n\n${images.map((data, index) => `[image${index + 1}]: ${data}`).join('\n\n')}`)}
                              onPaste={onPaste}/>
    </Container>
  );
}

export default App;
