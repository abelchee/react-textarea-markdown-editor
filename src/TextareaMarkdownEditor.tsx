import * as React from 'react';
import { useRef } from 'react';
import { IEnhancedTextareaHandles } from 'react-enhanced-textarea';
import EditContext from './EditorContext';

export interface ITextareaMarkdownEditor {
  children: React.ReactNode;
  id?: string | undefined;
  textareaId?: string | undefined;
  className?: string | undefined;
  style?: object | undefined;
  rows?: number;
  defaultValue?: string | undefined;
  value?: string | undefined;
  autoFocus?: boolean;
  onChange?: (textarea?: HTMLTextAreaElement) => {} | undefined;
  onKeyDown?: (event: React.KeyboardEvent) => {} | undefined;
  onKeyPress?: (event: React.KeyboardEvent) => {} | undefined;
}

const TextareaMarkdownEditor: React.FunctionComponent<ITextareaMarkdownEditor> = props => {
  const textareaRef = useRef<IEnhancedTextareaHandles>(null);
  return (
    <EditContext.Provider
      value={{
        autoFocus: props.autoFocus,
        defaultValue: props.defaultValue,
        rows: props.rows,
        textareaId: props.textareaId,
        textareaRef,
      }}
    >
      {props.children}
    </EditContext.Provider>
  );
};

TextareaMarkdownEditor.defaultProps = {
  rows: 5,
};

export default TextareaMarkdownEditor;
