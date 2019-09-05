import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';

export interface IEditorMenuDropdownProps {
  className?: string | undefined;
  text: React.ReactElement | string;
  children: React.ReactElement;
}

const EditorMenuDropdown: React.FunctionComponent<IEditorMenuDropdownProps> = props => {
  const [show, toggleShow] = useState(false);
  return (
    <li
      className={classNames('tme-menu-item tme-dropdown', props.className)}
      onClick={() => {
        toggleShow(!show);
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
