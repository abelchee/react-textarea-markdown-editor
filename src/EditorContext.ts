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
  lineMarkers?: string[];
  onChange?: (textarea?: HTMLTextAreaElement) => {} | undefined;
  onKeyDown?: (event: React.KeyboardEvent) => {} | undefined;
  onKeyPress?: (event: React.KeyboardEvent) => {} | undefined;
  mark?: (prefix: string, suffix: string, defaultText: string, multipleLine: boolean) => void;
  markLine?: (marker: string) => void;
  registerLineMarker?: (marker: string) => void;
  focus?: () => void;
}

export default React.createContext<IEditorContext>({});
