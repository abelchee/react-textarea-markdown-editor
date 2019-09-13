import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import EditorContext from './EditorContext';
import { ITemplateMarker } from './type';

export interface IEditorTemplateMarkerProps {
  config: ITemplateMarker;
  className?: string;
  removeInnerClass?: boolean;
}

const EditorTemplateMarker: React.FunctionComponent<IEditorTemplateMarkerProps> = props => {
  const { template } = useContext(EditorContext);
  const { config } = props;
  return (
    <span
      onClick={() => template!(config.template, config.multipleLine || false)}
      className={classNames({ 'tme-menu-item-inner': !props.removeInnerClass }, props.className)}
    >
      {config.name}
    </span>
  );
};

export default EditorTemplateMarker;
