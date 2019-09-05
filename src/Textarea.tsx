import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import EnhancedTextarea from 'react-enhanced-textarea';
import EditorContext from './EditorContext';

export interface ITextareaProps {
  className?: string | undefined;
}

const Textarea: React.FunctionComponent<ITextareaProps> = props => {
  const {
    textareaRef,
    rows,
    autoFocus,
    defaultValue,
    onChange,
    onKeyDown,
    onKeyPress,
    textareaId,
    value,
    lineMarkers,
  } = useContext(EditorContext);

  return (
    <EnhancedTextarea
      id={textareaId}
      className={classNames(props.className, 'tme-textarea')}
      ref={textareaRef}
      rows={rows}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
      lineMarkers={lineMarkers}
    />
  );
};

export default Textarea;
