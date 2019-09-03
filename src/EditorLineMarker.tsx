import * as React from 'react';
import { useContext } from 'react';
import EditorContext from './EditorContext';

export interface IEditorLineMarkerProps {
  marker: string;
  children: (mark: () => void) => React.ReactElement;
}

const EditorLineMarker: React.FunctionComponent<IEditorLineMarkerProps> = props => {
  const { markLine, registerLineMarker } = useContext(EditorContext);
  registerLineMarker!(props.marker);
  return props.children(() => markLine!(props.marker));
};

export default EditorLineMarker;
