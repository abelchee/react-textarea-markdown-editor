import classNames from 'classnames';
import * as React from 'react';
import { RefObject } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditContext from './EditorContext';
import EditorMenu from './EditorMenu';
import { IMarkerGroup } from './type';

export interface ITextareaMarkdownEditor {
  id?: string;
  textareaId?: string;
  className?: string;
  viewerClassName?: string;
  viewerStyle?: object;
  placeholder?: string;
  style?: object;
  textareaStyle?: object;
  rows?: number;
  defaultValue?: string;
  value?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => {};
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

interface ITextareaMarkdownEditorState {
  edit: boolean;
  lineMarkers: string[];
  value?: string;
}

class TextareaMarkdownEditor extends React.Component<ITextareaMarkdownEditor, ITextareaMarkdownEditorState> {
  public static defaultProps = {
    language: 'en',
    readOnly: false,
    rows: 5,
  };

  private textareaRef: RefObject<EnhancedTextarea>;

  constructor(props: ITextareaMarkdownEditor) {
    super(props);
    this.textareaRef = React.createRef();
    this.state = {
      edit: !props.readOnly,
      lineMarkers: [],
      value: props.defaultValue,
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.mark = this.mark.bind(this);
    this.markLine = this.markLine.bind(this);
    this.registerLineMarker = this.registerLineMarker.bind(this);
    this.markTemplate = this.markTemplate.bind(this);
  }

  public focus() {
    this.textareaRef.current!.focus();
  }

  public append(content: string) {
    this.textareaRef.current!.append(content);
  }

  public mark(prefix: string, suffix: string, defaultText: string, multipleLine?: boolean) {
    if (multipleLine) {
      this.textareaRef.current!.toggleMultipleLineMarker({ prefix, suffix, defaultText });
    } else {
      this.textareaRef.current!.toggleMarker({ prefix, suffix, defaultText });
    }
  }
  public markLine(marker: string) {
    this.textareaRef.current!.toggleLineMarker(marker);
  }
  public registerLineMarker(marker: string) {
    const index = this.state.lineMarkers.indexOf(marker);
    if (index < 0) {
      this.setState({ ...this.state, lineMarkers: [...this.state.lineMarkers, marker] });
    }
  }
  public markTemplate(template: string, multipleLine?: boolean) {
    if (multipleLine) {
      this.textareaRef.current!.toggleMultipleLineTemplate(template);
    } else {
      this.textareaRef.current!.toggleTemplate(template);
    }
  }

  public render() {
    const { readOnly = false } = this.props;
    return (
      <div id={this.props.id} className={classNames('tme-container', this.props.className)} style={this.props.style}>
        <EditContext.Provider
          value={{
            focus: this.focus,
            mark: this.mark,
            markLine: this.markLine,
            registerLineMarker: this.registerLineMarker,
            template: this.markTemplate,
          }}
        >
          <EditorMenu
            markers={this.props.markers}
            readOnly={readOnly}
            language={this.props.language!}
            isEditing={this.state.edit}
            toggleEdit={this.toggleEdit}
          />
          {this.state.edit ? (
            <EnhancedTextarea
              id={this.props.textareaId}
              className="tme-textarea"
              ref={this.textareaRef}
              rows={this.props.rows}
              style={this.props.textareaStyle}
              autoFocus={this.props.autoFocus}
              defaultValue={this.props.value ? undefined : this.state.value}
              value={this.props.value}
              onChange={this.onChange}
              onKeyDown={this.props.onKeyDown}
              onKeyPress={this.props.onKeyPress}
              lineMarkers={this.state.lineMarkers}
              onPaste={this.props.onPaste}
              onPasteCapture={this.props.onPasteCapture}
              onCopy={this.props.onCopy}
              onCopyCapture={this.props.onCopyCapture}
              placeholder={this.props.placeholder}
            />
          ) : (
            <div
              className={classNames('tme-viewer', this.props.viewerClassName)}
              style={this.props.viewerStyle}
              dangerouslySetInnerHTML={{
                __html: this.textareaRef.current ? this.props.doParse(this.textareaRef.current.value) : '',
              }}
            />
          )}
        </EditContext.Provider>
      </div>
    );
  }

  private toggleEdit() {
    this.setState({ ...this.state, edit: !this.state.edit });
  }

  private onChange(value: string) {
    this.setState({ ...this.state, value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}

export default TextareaMarkdownEditor;
