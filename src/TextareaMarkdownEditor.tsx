import classNames from 'classnames';
import Markdown from 'markdown-it';
import * as React from 'react';
import { useRef, useState } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditContext from './EditorContext';
import EditorMenu from './EditorMenu';
import Textarea from './Textarea';

const md = new Markdown({
  xhtmlOut: true,
});

function doParse(text: string) {
  return md.render(text);
}

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
  onChange?: (textarea: HTMLTextAreaElement) => {} | undefined;
  onKeyDown?: (event: React.KeyboardEvent) => {} | undefined;
  onKeyPress?: (event: React.KeyboardEvent) => {} | undefined;
  doParse?: (text: string) => string;
  language?: string;
}

const TextareaMarkdownEditor: React.FunctionComponent<ITextareaMarkdownEditor> = props => {
  const textareaRef = useRef<EnhancedTextarea>(null);
  const [lineMarkers, setLineMarkers] = useState<string[]>([]);
  const [edit, setEdit] = useState(true);
  const [value, setValue] = useState(props.value || props.defaultValue);
  function toggleEdit() {
    setEdit(!edit);
  }
  function onChange(textarea: HTMLTextAreaElement) {
    setValue(textarea.value);
    if (props.onChange) {
      props.onChange(textarea);
    }
  }
  return (
    <div className={classNames('tme-container', props.className)}>
      <EditContext.Provider
        value={{
          autoFocus: props.autoFocus,
          defaultValue: props.defaultValue,
          doParse: props.doParse || doParse,
          focus: () => {
            textareaRef.current!.focus();
          },
          isEditing: edit,
          language: props.language || 'en',
          lineMarkers,
          mark: (prefix: string, suffix: string, defaultText: string, multipleLine: boolean) => {
            if (multipleLine) {
              textareaRef.current!.toggleMultipleLineMarker({ prefix, suffix, defaultText });
            } else {
              textareaRef.current!.toggleMarker({ prefix, suffix, defaultText });
            }
          },
          markLine: (marker: string) => {
            textareaRef.current!.toggleLineMarker(marker);
          },
          onChange,
          registerLineMarker: (marker: string) => {
            const index = lineMarkers.indexOf(marker);
            if (index < 0) {
              setLineMarkers([...lineMarkers, marker]);
            }
          },
          rows: props.rows,
          textareaId: props.textareaId,
          textareaRef,
          toggleEdit,
          value,
        }}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            <EditorMenu />
            {edit ? (
              <Textarea />
            ) : (
              <div
                className="tme-viewer"
                dangerouslySetInnerHTML={{
                  __html: textareaRef.current ? (props.doParse || doParse)(textareaRef.current.value) : '',
                }}
              />
            )}
          </>
        )}
      </EditContext.Provider>
    </div>
  );
};

TextareaMarkdownEditor.defaultProps = {
  language: 'en',
  rows: 5,
};

export default TextareaMarkdownEditor;
