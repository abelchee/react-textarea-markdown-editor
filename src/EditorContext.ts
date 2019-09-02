import * as React from 'react';
import { RefObject } from 'react';
import { IEnhancedTextareaHandles } from 'react-enhanced-textarea';

interface IEditorContext {
  textareaRef?: RefObject<IEnhancedTextareaHandles>;
  textareaId?: string | undefined;
  rows?: number;
  defaultValue?: string | undefined;
  value?: string | undefined;
  autoFocus?: boolean;
  onChange?: (textarea?: HTMLTextAreaElement) => {} | undefined;
  onKeyDown?: (event: React.KeyboardEvent) => {} | undefined;
  onKeyPress?: (event: React.KeyboardEvent) => {} | undefined;
}

export default React.createContext<IEditorContext>({});
