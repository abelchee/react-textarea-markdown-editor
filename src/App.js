import React, { useState } from 'react';
import './App.css';
import TextareaMarkdownEditor from 'react-textarea-markdown-editor';
import { Container, Tab, Dropdown } from 'semantic-ui-react';
import md from './md';
import CustomizedMarkdownEditor from './CustomizedMarkdownEditor';

const value = `
# react-textarea-markdown-editor
A highly **customizable**, **light weight** *React* markdown editor which is
* Based on pure textarea
* Not bundled with any markdown parser. Free free to use [markdown-it](https://www.npmjs.com/package/markdown-it), [marked](https://www.npmjs.com/package/marked) or other markdown parsers.
* Support dropping and pasting image by customization (Please check the example)
* Customizable menu bar
`;

const languageOptions = [
  { key: 'Chinese', text: '简体中文', value: 'zh' },
  { key: 'English', text: 'English', value: 'en' },
];

function App () {
  const [language, setLang] = useState('en');
  const panes = [
    {
      menuItem: 'Default', render: () =>
        <TextareaMarkdownEditor defaultValue={value} language={language} rows={10}
                                doParse={text => md.render(text)}/>,
    },
    { menuItem: 'Customized', render: () => <CustomizedMarkdownEditor language={language}/> },
  ];
  return (
    <Container>
      <Dropdown
        button
        className='icon'
        floating
        labeled
        icon='world'
        options={languageOptions}
        defaultValue={language}
        text={languageOptions.find(it => it.value === language).text}
        onChange={(e, data) => {
          setLang(data.value);
        }}
      />
      <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
    </Container>
  );
}

export default App;
