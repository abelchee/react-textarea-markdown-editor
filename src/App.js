import React, { useState } from 'react';
import './App.css';
import { TextareaMarkdownEditor } from 'react-textarea-markdown-editor';

function App () {
  const [lang, setLang] = useState('en');
  return (
    <div className="App">
      <button type="button" onClick={()=>setLang('en')}>English</button>
      <button type="button" onClick={()=>setLang('zh')}>简体中文</button>
      <br/>
      <br/>
      <TextareaMarkdownEditor language={lang} id="111111" rows={10}/>
    </div>
  );
}

export default App;
