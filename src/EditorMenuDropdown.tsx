import classNames from 'classnames';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useRef } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import EditorContext from './EditorContext';
// @ts-ignore
import arrowIcon from './icon/arrow.svg';
import { IDropdown } from './type';
import EditorLineMarker from './EditorLineMarker';
import EditorMarker from './EditorMarker';

export interface IEditorMenuDropdownProps {
  className?: string | undefined;
  config: IDropdown;
}

const EditorMenuDropdown: React.FunctionComponent<IEditorMenuDropdownProps> = props => {
  const [show, toggleShow] = useState(false);
  const { focus } = useContext(EditorContext);
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggleShow(false);
  });
  const { config } = props;
  return (
    <li ref={ref} className={classNames('tme-menu-item tme-dropdown', props.className)}>
      <span className="tme-menu-item-inner">{config.markers[0].short || config.markers[0].long}</span>
      <span
        className="tme-dropdown-arrow"
        onClick={() => {
          toggleShow(!show);
          if (!show) {
            focus!();
          }
        }}
      >
        <img alt="" src={arrowIcon} />
      </span>
      <div
        className={classNames('tme-dropdown-content', {
          show,
        })}
      >
        <ul>
          {config.markers.map(marker => {
            switch (marker.type) {
              case 'line-marker':
                return (
                  <EditorLineMarker key={marker.key} marker={marker.marker}>
                    {mark => (
                      <li className="tme-menu-item" onClick={mark}>
                        {marker.short || marker.long}
                      </li>
                    )}
                  </EditorLineMarker>
                );
              case 'marker':
                return (
                  <EditorMarker
                    key={marker.key}
                    prefix={marker.prefix}
                    suffix={marker.suffix}
                    defaultText={marker.defaultText}
                  >
                    {mark => (
                      <li className="tme-menu-item" onClick={mark}>
                        {marker.short || marker.long}
                      </li>
                    )}
                  </EditorMarker>
                );
            }
          })}
        </ul>
      </div>
    </li>
  );
};

export default EditorMenuDropdown;
