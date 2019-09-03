import * as React from 'react';
import classNames from 'classnames';

export interface IEditorMenuProps {
  className?: string | undefined;
}

const EditorMenu: React.FunctionComponent<IEditorMenuProps> = props => {
  return (
    <div className={classNames('tme-menu', props.className)}>
      <div className="tme-menu-group">
        <div className="tme-menu-item">
          <b>H1</b>
        </div>
      </div>
    </div>
  );
};

export default EditorMenu;
