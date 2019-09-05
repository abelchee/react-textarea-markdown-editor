import classNames from 'classnames';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useRef } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import EditorContext from './EditorContext';

export interface IEditorMenuDropdownProps {
  className?: string | undefined;
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
    <li
      ref={ref}
      className={classNames('tme-menu-item tme-dropdown', props.className)}
      onClick={() => {
        toggleShow(!show);
        if (!show) {
          focus!();
        }
      }}
    >
      {props.text}
      <i className="tme-dropdown-arrow" />
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
