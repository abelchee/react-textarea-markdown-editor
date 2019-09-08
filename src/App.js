import React from 'react';
import './App.css';
import { TextareaMarkdownEditor } from 'react-textarea-markdown-editor';

function App() {
  return (
    <div className="App">
        <TextareaMarkdownEditor language="zh"  id="123" rows={10}/>
    </div>
  );
}

export default App;
