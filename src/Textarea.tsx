import * as React from 'react';
import { useContext } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditorContext from './EditorContext';

export interface ITextareaProps {}

const Textarea: React.FunctionComponent<ITextareaProps> = ({}) => {
  const { textareaRef, rows, autoFocus, defaultValue, onChange, onKeyDown, onKeyPress, textareaId, value } = useContext(
    EditorContext,
  );

  return (
    <EnhancedTextarea
      id={textareaId}
      ref={textareaRef}
      rows={rows}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
    />
  );
};

export default Textarea;
