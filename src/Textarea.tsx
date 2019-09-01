import * as React from 'react';
import { useContext } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditorContext from './EditorContext';

export interface ITextareaProps {}

const Textarea: React.FunctionComponent<ITextareaProps> = ({}) => {
  const { textareaRef } = useContext(EditorContext);

  return <EnhancedTextarea ref={textareaRef} />;
};

export default Textarea;
