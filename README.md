# react-textarea-markdown-editor
![Travis (.org) branch](https://img.shields.io/travis/abelchee/react-textarea-markdown-editor/master)
[![GitHub issues](https://img.shields.io/github/issues/abelchee/react-textarea-markdown-editor)](https://github.com/abelchee/react-textarea-markdown-editor/issues)
[![GitHub forks](https://img.shields.io/github/forks/abelchee/react-textarea-markdown-editor)](https://github.com/abelchee/react-textarea-markdown-editor/network)
[![GitHub stars](https://img.shields.io/github/stars/abelchee/react-textarea-markdown-editor)](https://github.com/abelchee/react-textarea-markdown-editor/stargazers)
![NPM](https://img.shields.io/npm/l/react-textarea-markdown-editor)


A highly **customizable**, **light weight** *React* markdown editor which is
* Based on pure textarea
* Not bundled with any markdown parser. Free free to use [markdown-it](https://www.npmjs.com/package/markdown-it), [marked](https://www.npmjs.com/package/marked) or other markdown parsers.
* Support dropping and pasting image by customization (Please check the example)
* Customizable menu bar

## Table of contents
* [Example](#example)
* [Installation](#installation)
* [Usage](#usage)
* [Reference](#reference)
* [TODO](#todo)


## Example
https://abelchee.github.io/react-textarea-markdown-editor/

Git repo for example: https://github.com/abelchee/react-textarea-markdown-editor/tree/pages

## installation
```bash
yarn add react-textarea-markdown-editor
```
or
```bash
npm install react-textarea-markdown-editor
```

## Usage
```jsx harmony
import React from 'react';
import md from 'mardown-it';
import 'react-textarea-markdown-editor/build/TextareaMarkdownEditor.css';
import TextareaMarkdownEditor from 'react-textarea-markdown-editor';

function App(){
  return <TextareaMarkdownEditor doParse={md.render}/>
}

```

You can also import scss file
```typescript
import 'react-textarea-markdown-editor/build/TextareaMarkdownEditor.scss';
```

## Reference
### Properties
```typescript
// Component menu item which is used for customization
export interface ICmp {
  key: string;
  type: 'component';
  title?: string;
  name: string | React.ReactElement;
}

// Inline marker
export interface IMarker {
  key: string;
  type: 'marker';
  prefix: string; // For bold it is **
  suffix: string; // For bold it is **
  multipleLine?: boolean; // If true, it will add extra \n before and after the prefix and suffix
  name: string | React.ReactElement; // Menu item text
  defaultText?: string;
  title?: string;
}

// Menu item to add a string template
export interface ITemplateMarker {
  key: string;
  type: 'template';
  template: string;
  multipleLine?: boolean; // If true, it will add extra \n before and after the template
  name: string | React.ReactElement;
  title?: string;
}

// Menu item to mark the whole line such as ordered and unordered list
export interface ILineMarker {
  key: string;
  type: 'line-marker';
  marker: string;
  name: string | React.ReactElement;
  title?: string;
}

// Dropdown
export interface IDropdown {
  key: string;
  type: 'dropdown';
  markers: Array<IMarker | ILineMarker | ITemplateMarker | ICmp>;
}

export interface IMarkerGroup {
  key: string;
  markers: Array<IMarker | ILineMarker | ITemplateMarker | IDropdown | ICmp>;
}
export interface ITextareaMarkdownEditor {
  id?: string; // Id of the container
  textareaId?: string; // id of the textarea
  className?: string; // className of the container
  placeholder?: string; // Placeholder of the textarea
  style?: object; // style of the container
  textareaStyle?: object; // style of the textarea
  rows?: number; // how many roles
  defaultValue?: string;
  value?: string;
  autoFocus?: boolean; // auto focus
  readOnly?: boolean; 
  onChange?: (textarea: HTMLTextAreaElement) => {};
  onKeyDown?: (event: React.KeyboardEvent) => {};
  onKeyPress?: (event: React.KeyboardEvent) => {};
  doParse: (text: string) => string; // Pass in the markdown parser
  language?: string; // en for English or zh for Simplified Chinese
  markers?: IMarkerGroup[]; // Mainly for menu customization, please check the example below
  onCopy?: (event: React.ClipboardEvent) => void;
  onCopyCapture?: (event: React.ClipboardEvent) => void;
  onPaste?: (event: React.ClipboardEvent) => void;
  onPasteCapture?: (event: React.ClipboardEvent) => void;
}
```

`markers` example

```jsx harmony
import React, { useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import md from 'mardown-it';
import 'react-textarea-markdown-editor/build/TextareaMarkdownEditor.css';
import TextareaMarkdownEditor from 'react-textarea-markdown-editor';
import languages from './lang.json';

function App(props){
  const editorRef = useRef(null);
  const {language} = props;
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
  return <TextareaMarkdownEditor markers={markers} ref={editorRef} doParse={md.render} language={language}  />
}

```

### Component Ref Methods
```jsx harmony
import React, { useRef } from 'react';
import md from 'mardown-it';
import 'react-textarea-markdown-editor/build/TextareaMarkdownEditor.css';
import TextareaMarkdownEditor from 'react-textarea-markdown-editor';

function App(){
  const editorRef = useRef(null);
  return <TextareaMarkdownEditor ref={editorRef} doParse={md.render}/>
}

```
#### `public mark(prefix: string, suffix: string, defaultText: string, multipleLine: boolean) => void`
For bold
```typescript
editorRef.current.mark('**','**','bold')
```
#### `public markLine(marker: string) => void`
For unordered-list
```typescript
editorRef.current.markLine('* ')
```
#### `public registerLineMarker(marker: string) => void`
For automatically add line marker when user clicks enter key
#### `public markTemplate(template: string, multipleLine: boolean) => void`
For add a template string

## TODO
* Example in CodeSandbox
* Add badge in file
* More unit test
