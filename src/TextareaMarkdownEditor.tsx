import classNames from 'classnames';
import * as React from 'react';
import { useRef, useState } from 'react';
import { IEnhancedTextareaHandles } from 'react-enhanced-textarea';
import EditContext from './EditorContext';
import EditorMenu from './EditorMenu';
import Textarea from './Textarea';

export interface ITextareaMarkdownEditor {
  children?: React.ReactNode | undefined;
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
  const [lineMarkers, setLineMarkers] = useState<string[]>([]);
  return (
    <div className={classNames('tme-container', props.className)}>
      <EditContext.Provider
        value={{
          autoFocus: props.autoFocus,
          defaultValue: props.defaultValue,
          lineMarkers,
          mark: (prefix: string, suffix: string, defaultText: string = '') => {
            textareaRef.current!.toggleMarker({ prefix, suffix, defaultText });
          },
          markLine: (marker: string) => {
            textareaRef.current!.toggleLineMarker(marker);
          },
          registerLineMarker: (marker: string) => {
            const index = lineMarkers.indexOf(marker);
            if (index < 0) {
              setLineMarkers([...lineMarkers, marker]);
            }
          },
          rows: props.rows,
          textareaId: props.textareaId,
          textareaRef,
        }}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            <EditorMenu />
            <Textarea />
          </>
        )}
      </EditContext.Provider>
    </div>
  );
};

TextareaMarkdownEditor.defaultProps = {
  rows: 5,
};

export default TextareaMarkdownEditor;
