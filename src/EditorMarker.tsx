import * as React from 'react';
import { useContext } from 'react';
import EditorContext from './EditorContext';

export interface IEditorMarkerProps {
  marker: string;
  defaultText?: string;
  children: (mark: () => void) => React.ReactElement;
}

const EditorMarker: React.FunctionComponent<IEditorMarkerProps> = props => {
  const { mark } = useContext(EditorContext);
  return props.children(() => mark!(props.marker, props.marker, props.defaultText));
};

EditorMarker.defaultProps = {
  defaultText: '',
};

export default EditorMarker;
