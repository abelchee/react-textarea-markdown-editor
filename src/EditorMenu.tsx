import * as React from 'react';
import classNames from 'classnames';
import EditorLineMarker from './EditorLineMarker';
import EditorMarker from './EditorMarker';

export interface IEditorMenuProps {
  className?: string | undefined;
}

const EditorMenu: React.FunctionComponent<IEditorMenuProps> = props => {
  return (
    <div className={classNames('tme-menu', props.className)}>
      <div className="tme-menu-group left">
        <EditorLineMarker marker="# ">
          {mark => (
            <div className="tme-menu-item" onClick={mark}>
              <b>H1</b>
            </div>
          )}
        </EditorLineMarker>
        <EditorLineMarker marker="## ">
          {mark => (
            <div className="tme-menu-item" onClick={mark}>
              <b>H2</b>
            </div>
          )}
        </EditorLineMarker>
        <EditorLineMarker marker="### ">
          {mark => (
            <div className="tme-menu-item" onClick={mark}>
              <b>H2</b>
            </div>
          )}
        </EditorLineMarker>
      </div>
      <div className="tme-menu-group left">
        <EditorMarker marker="**" defaultText="bold">
          {mark => (
            <div className="tme-menu-item" onClick={mark}>
              <b>B</b>
            </div>
          )}
        </EditorMarker>
        <EditorMarker marker="*" defaultText="italic">
          {mark => (
            <div className="tme-menu-item" onClick={mark}>
              <b>I</b>
            </div>
          )}
        </EditorMarker>
      </div>
    </div>
  );
};

export default EditorMenu;
