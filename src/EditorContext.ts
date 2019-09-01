import * as React from 'react';
import { RefObject } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';

type EditorContext = {
  textareaRef?: RefObject<EnhancedTextarea>;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

export default React.createContext<EditorContext>({});
