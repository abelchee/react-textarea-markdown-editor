import React from 'react';
import './App.css';
import { Textarea, TextareaMarkdownEditor } from 'react-textarea-markdown-editor';

function App() {
  return (
    <div className="App">
        <TextareaMarkdownEditor id="123">
           <Textarea />
         </TextareaMarkdownEditor>,
    </div>
  );
}

export default App;
