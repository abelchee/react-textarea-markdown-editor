import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import EditorContext from './EditorContext';
import { ILineMarker } from './type';

export interface IEditorLineMarkerProps {
  config: ILineMarker;
  className?: string;
  onClick?: () => void;
  removeInnerClass?: boolean;
}

const EditorLineMarker: React.FunctionComponent<IEditorLineMarkerProps> = props => {
  const { markLine, registerLineMarker } = useContext(EditorContext);
  const { config } = props;
  registerLineMarker!(config.marker);
  return (
    <span
      onClick={() => {
        markLine!(config.marker);
        if (props.onClick) {
          props.onClick();
        }
      }}
      className={classNames({ 'tme-menu-item-inner': !props.removeInnerClass }, props.className)}
    >
      {config.name}
    </span>
  );
};

export default EditorLineMarker;
