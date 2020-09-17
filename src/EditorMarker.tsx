import classNames from 'classnames';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import EditorContext from './EditorContext';
import { ICmp, ILineMarker, IMarker, ITemplateMarker } from './type';

export interface IEditorMarkerProps {
  config: IMarker | ILineMarker | ITemplateMarker | ICmp;
  className?: string;
}

const EditorMarker: React.FunctionComponent<IEditorMarkerProps> = (props) => {
  const { mark, markLine, registerLineMarker, template } = useContext(EditorContext);
  useEffect(() => {
    if (config.type === 'line-marker') {
      registerLineMarker!(config.marker);
    }
  });
  const { config } = props;
  let handler;
  switch (config.type) {
    case 'marker':
      handler = () => mark!(config.prefix, config.suffix, config.defaultText || '', config.multipleLine || false);
      break;
    case 'line-marker':
      handler = () => markLine!(config.marker);
      break;
    case 'template':
      handler = () => template!(config.template, config.multipleLine || false);
      break;
    case 'component':
      handler = undefined;
      break;
  }
  return (
    <span onClick={handler} className={classNames('tme-menu-item-inner', props.className)}>
      {config.name}
    </span>
  );
};

export default EditorMarker;
