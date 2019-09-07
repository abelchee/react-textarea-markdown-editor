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
  isEditing?: boolean;
  onChange?: (textarea: HTMLTextAreaElement) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  mark?: (prefix: string, suffix: string, defaultText: string, multipleLine: boolean) => void;
  markLine?: (marker: string) => void;
  registerLineMarker?: (marker: string) => void;
  focus?: () => void;
  doParse?: (text: string) => string;
  toggleEdit?: () => void;
}

export default React.createContext<IEditorContext>({});
