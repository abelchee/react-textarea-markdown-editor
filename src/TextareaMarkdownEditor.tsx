import classNames from 'classnames';
import * as React from 'react';
import { useRef, useState } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditContext from './EditorContext';
import EditorMenu from './EditorMenu';
import { IMarkerGroup } from './type';

export interface ITextareaMarkdownEditor {
  id?: string | undefined;
  textareaId?: string | undefined;
  className?: string | undefined;
  style?: object | undefined;
  rows?: number;
  defaultValue?: string | undefined;
  value?: string | undefined;
  autoFocus?: boolean;
  readOnly?: boolean;
  onChange?: (textarea: HTMLTextAreaElement) => {} | undefined;
  onKeyDown?: (event: React.KeyboardEvent) => {} | undefined;
  onKeyPress?: (event: React.KeyboardEvent) => {} | undefined;
  doParse: (text: string) => string;
  language?: string;
  markers?: IMarkerGroup[];
}

const TextareaMarkdownEditor: React.FunctionComponent<ITextareaMarkdownEditor> = props => {
  const { readOnly = false } = props;
  const textareaRef = useRef<EnhancedTextarea>(null);
  const [lineMarkers, setLineMarkers] = useState<string[]>([]);
  const [edit, setEdit] = useState(!readOnly);
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
            autoFocus={props.autoFocus}
            defaultValue={props.defaultValue}
            value={value}
            onChange={onChange}
            onKeyDown={props.onKeyDown}
            onKeyPress={props.onKeyPress}
            lineMarkers={lineMarkers}
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
