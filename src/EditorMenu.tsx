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
      <ul className="tme-menu-group left">
        <li className="tme-menu-item tme-dropdown-trigger">
          <b>H1</b>
          <i className="tme-dropdown-arrow" />
        </li>
      </ul>
      <ul className="tme-menu-group left">
        <EditorLineMarker marker="# ">
          {mark => (
            <li className="tme-menu-item" onClick={mark}>
              <b>H1</b>
            </li>
          )}
        </EditorLineMarker>
        <EditorLineMarker marker="## ">
          {mark => (
            <li className="tme-menu-item" onClick={mark}>
              <b>H2</b>
            </li>
          )}
        </EditorLineMarker>
        <EditorLineMarker marker="### ">
          {mark => (
            <li className="tme-menu-item" onClick={mark}>
              <b>H2</b>
            </li>
          )}
        </EditorLineMarker>
      </ul>
      <ul className="tme-menu-group left">
        <EditorMarker marker="**" defaultText="bold">
          {mark => (
            <li className="tme-menu-item" onClick={mark}>
              <b>B</b>
            </li>
          )}
        </EditorMarker>
        <EditorMarker marker="*" defaultText="italic">
          {mark => (
            <li className="tme-menu-item tme-material-icon" onClick={mark}>
              <img
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDR2M2gyLjIxbC0zLjQyIDhINnYzaDh2LTNoLTIuMjFsMy40Mi04SDE4VjR6Ii8+PC9zdmc+"
              />
            </li>
          )}
        </EditorMarker>
      </ul>
      <ul className="tme-menu-group left">
        <EditorLineMarker marker="* ">
          {mark => (
            <li className="tme-menu-item tme-material-icon" onClick={mark}>
              <img
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNCAxMC41Yy0uODMgMC0xLjUuNjctMS41IDEuNXMuNjcgMS41IDEuNSAxLjUgMS41LS42NyAxLjUtMS41LS42Ny0xLjUtMS41LTEuNXptMC02Yy0uODMgMC0xLjUuNjctMS41IDEuNVMzLjE3IDcuNSA0IDcuNSA1LjUgNi44MyA1LjUgNiA0LjgzIDQuNSA0IDQuNXptMCAxMmMtLjgzIDAtMS41LjY4LTEuNSAxLjVzLjY4IDEuNSAxLjUgMS41IDEuNS0uNjggMS41LTEuNS0uNjctMS41LTEuNS0xLjV6TTcgMTloMTR2LTJIN3Yyem0wLTZoMTR2LTJIN3Yyem0wLTh2MmgxNFY1SDd6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ii8+PC9zdmc+"
              />
            </li>
          )}
        </EditorLineMarker>
        <EditorLineMarker marker="1. ">
          {mark => (
            <li className="tme-menu-item tme-material-icon" onClick={mark}>
              <img
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMiAxN2gydi41SDN2MWgxdi41SDJ2MWgzdi00SDJ2MXptMS05aDFWNEgydjFoMXYzem0tMSAzaDEuOEwyIDEzLjF2LjloM3YtMUgzLjJMNSAxMC45VjEwSDJ2MXptNS02djJoMTRWNUg3em0wIDE0aDE0di0ySDd2MnptMC02aDE0di0ySDd2MnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+"
              />
            </li>
          )}
        </EditorLineMarker>
      </ul>
      <ul className="tme-menu-group right">
        <li className="tme-menu-item">
          <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
            <b>?</b>
          </a>
        </li>
        <li className="tme-menu-item">Preview</li>
      </ul>
    </div>
  );
};

export default EditorMenu;
