import * as React from 'react';
import { useContext } from 'react';
import EditorContext from './EditorContext';

export interface IEditorMarkerProps {
  prefix: string;
  suffix: string;
  defaultText?: string;
  children: (mark: () => void) => React.ReactElement;
}

const EditorMarker: React.FunctionComponent<IEditorMarkerProps> = props => {
  const { mark } = useContext(EditorContext);
  return props.children(() => mark!(props.prefix, props.suffix, props.defaultText));
};

EditorMarker.defaultProps = {
  defaultText: '',
};

export default EditorMarker;
