# react-textarea-markdown-editor
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
  markers?: IMarkerGroup[];
  onCopy?: (event: React.ClipboardEvent) => void;
  onCopyCapture?: (event: React.ClipboardEvent) => void;
  onPaste?: (event: React.ClipboardEvent) => void;
  onPasteCapture?: (event: React.ClipboardEvent) => void;
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
editorRef.current.mark('* ')
```
#### `public registerLineMarker(marker: string) => void`
For automatically add line marker when user clicks enter key
#### `public markTemplate(template: string, multipleLine: boolean) => void`
For add a template string

## TODO
* Example in CodeSandbox
* Add badge in file