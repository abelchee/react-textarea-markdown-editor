import * as React from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditContext from './EditorContext';

export interface ITextareaMarkdownEditor {
  children: React.ReactNode;
}

const TextareaMarkdownEditor: React.FunctionComponent<ITextareaMarkdownEditor> = ({ children }) => {
  const textareaRef = React.createRef<EnhancedTextarea>();
  const onChange = (value: string) => {
    console.log(value);
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    console.log(event);
  };
  return (
    <EditContext.Provider
      value={{
        textareaRef,
        onChange,
        onKeyDown,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export default TextareaMarkdownEditor;
