import classNames from 'classnames';
import * as React from 'react';
import { useContext } from 'react';
import EditorContext from './EditorContext';
import { ILineMarker, IMarker, ITemplateMarker } from './type';

export interface IEditorMarkerProps {
  config: IMarker | ILineMarker | ITemplateMarker;
  className?: string;
}

const EditorMarker: React.FunctionComponent<IEditorMarkerProps> = props => {
  const { mark, markLine, registerLineMarker, template } = useContext(EditorContext);
  const { config } = props;
  let handler;
  switch (config.type) {
    case 'marker':
      handler = () => mark!(config.prefix, config.suffix, config.defaultText || '', config.multipleLine || false);
      break;
    case 'line-marker':
      registerLineMarker!(config.marker);
      handler = () => markLine!(config.marker);
      break;
    case 'template':
      handler = () => template!(config.template, config.multipleLine || false);
      break;
  }
  return (
    <span onClick={handler} className={classNames('tme-menu-item-inner', props.className)}>
      {config.name}
    </span>
  );
};

export default EditorMarker;
