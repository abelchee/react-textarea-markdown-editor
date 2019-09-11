import classNames from 'classnames';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useRef } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import EditorContext from './EditorContext';
// @ts-ignore
import arrowIcon from './icon/arrow.svg';

export interface IEditorMenuDropdownProps {
  className?: string | undefined;
  title?: string | undefined;
  text: React.ReactElement | string;
  children: React.ReactElement;
}

const EditorMenuDropdown: React.FunctionComponent<IEditorMenuDropdownProps> = props => {
  const [show, toggleShow] = useState(false);
  const { focus } = useContext(EditorContext);
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggleShow(false);
  });
  return (
    <li title={props.title} ref={ref} className={classNames('tme-menu-item tme-dropdown', props.className)}>
      <span className="tme-menu-item-inner">{props.text}</span>
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
        {props.children}
      </div>
    </li>
  );
};

export default EditorMenuDropdown;
