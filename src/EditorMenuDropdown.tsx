import classNames from 'classnames';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useRef } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import EditorContext from './EditorContext';
import EditorLineMarker from './EditorLineMarker';
import EditorMarker from './EditorMarker';
// @ts-ignore
import arrowIcon from './icon/arrow.svg';
import { IDropdown } from './type';

export interface IEditorMenuDropdownProps {
  className?: string | undefined;
  config: IDropdown;
}

const EditorMenuDropdown: React.FunctionComponent<IEditorMenuDropdownProps> = props => {
  const { config } = props;
  const [show, toggleShow] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(config.markers[0]);
  const { focus } = useContext(EditorContext);
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggleShow(false);
  });
  let dropdownTrigger;
  switch (currentMarker.type) {
    case 'line-marker':
      dropdownTrigger = (
        <EditorLineMarker key={currentMarker.key} marker={currentMarker.marker}>
          {mark => (
            <span className="tme-menu-item-inner tme-dropdown-trigger" onClick={mark}>
              {currentMarker.name}
            </span>
          )}
        </EditorLineMarker>
      );
      break;
    case 'marker':
      dropdownTrigger = (
        <EditorMarker
          key={currentMarker.key}
          prefix={currentMarker.prefix}
          suffix={currentMarker.suffix}
          defaultText={currentMarker.defaultText}
          multipleLine={currentMarker.multipleLine}
        >
          {mark => (
            <span className="tme-menu-item-inner tme-dropdown-trigger" onClick={mark}>
              {currentMarker.name}
            </span>
          )}
        </EditorMarker>
      );
      break;
  }
  return (
    <li ref={ref} className={classNames('tme-menu-item tme-dropdown', props.className)}>
      {dropdownTrigger}
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
                      <li
                        className="tme-menu-item"
                        onClick={() => {
                          toggleShow(!show);
                          mark();
                          setCurrentMarker(marker);
                        }}
                      >
                        {marker.name}
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
                    multipleLine={marker.multipleLine}
                  >
                    {mark => (
                      <li
                        className="tme-menu-item"
                        onClick={() => {
                          toggleShow(!show);
                          mark();
                          setCurrentMarker(marker);
                        }}
                      >
                        {marker.name}
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
