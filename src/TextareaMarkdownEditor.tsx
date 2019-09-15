import classNames from 'classnames';
import * as React from 'react';
import { useRef, useState } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditContext from './EditorContext';
import EditorMenu from './EditorMenu';
import { IMarkerGroup } from './type';

export interface ITextareaMarkdownEditor {
  id?: string;
  textareaId?: string;
  className?: string;
  style?: object;
  textareaStyle?: object;
  rows?: number;
  defaultValue?: string;
  value?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  onChange?: (textarea: HTMLTextAreaElement) => {};
  onKeyDown?: (event: React.KeyboardEvent) => {};
  onKeyPress?: (event: React.KeyboardEvent) => {};
  doParse: (text: string) => string;
  language?: string;
  markers?: IMarkerGroup[];
  onCopy?: (event: React.ClipboardEvent) => void;
  onCopyCapture?: (event: React.ClipboardEvent) => void;
  onPaste?: (event: React.ClipboardEvent) => void;
  onPasteCapture?: (event: React.ClipboardEvent) => void;
}

const TextareaMarkdownEditor: React.FunctionComponent<ITextareaMarkdownEditor> = props => {
  const { readOnly = false } = props;
  const textareaRef = useRef<EnhancedTextarea>(null);
  const [lineMarkers, setLineMarkers] = useState<string[]>([]);
  const [edit, setEdit] = useState(!readOnly);
  const [value, setValue] = useState(props.defaultValue);

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
    <div id={props.id} className={classNames('tme-container', props.className)} style={props.style}>
      <EditContext.Provider
        value={{
          focus: () => {
            textareaRef.current!.focus();
          },
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
          registerLineMarker: (marker: string) => {
            const index = lineMarkers.indexOf(marker);
            if (index < 0) {
              setLineMarkers([...lineMarkers, marker]);
            }
          },
          template: (template: string, multipleLine: boolean) => {
            if (multipleLine) {
              textareaRef.current!.toggleMultipleLineTemplate(template);
            } else {
              textareaRef.current!.toggleTemplate(template);
            }
          },
        }}
      >
        <EditorMenu
          markers={props.markers}
          readOnly={readOnly}
          language={props.language!}
          isEditing={edit}
          toggleEdit={toggleEdit}
        />
        {edit ? (
          <EnhancedTextarea
            id={props.textareaId}
            className="tme-textarea"
            ref={textareaRef}
            rows={props.rows}
            style={props.textareaStyle}
            autoFocus={props.autoFocus}
            defaultValue={value}
            value={props.value}
            onChange={onChange}
            onKeyDown={props.onKeyDown}
            onKeyPress={props.onKeyPress}
            lineMarkers={lineMarkers}
            onPaste={props.onPaste}
            onPasteCapture={props.onPasteCapture}
            onCopy={props.onCopy}
            onCopyCapture={props.onCopyCapture}
          />
        ) : (
          <div
            className="tme-viewer"
            dangerouslySetInnerHTML={{
              __html: textareaRef.current ? props.doParse(textareaRef.current.value) : '',
            }}
          />
        )}
      </EditContext.Provider>
    </div>
  );
};

TextareaMarkdownEditor.defaultProps = {
  language: 'en',
  readOnly: false,
  rows: 5,
};

export default TextareaMarkdownEditor;
