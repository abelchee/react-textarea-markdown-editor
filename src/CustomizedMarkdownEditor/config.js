import languages from './lang';
import { Icon } from 'semantic-ui-react';
import React from 'react';

export default function getConfig(language) {
  return [
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
      ],
    },
  ];
}
