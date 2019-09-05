import classNames from 'classnames';
import * as React from 'react';
import EditorLineMarker from './EditorLineMarker';
import EditorMarker from './EditorMarker';
import EditorMenuDropdown from './EditorMenuDropdown';

export interface IEditorMenuProps {
  className?: string | undefined;
}

const EditorMenu: React.FunctionComponent<IEditorMenuProps> = props => {
  return (
    <div className={classNames('tme-menu', props.className)}>
      <ul className="tme-menu-group left">
        <EditorMenuDropdown text={<b>H1</b>}>
          <ul>
            <EditorLineMarker marker="# ">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  <b>H1 #</b>
                </li>
              )}
            </EditorLineMarker>
            <EditorLineMarker marker="## ">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  <b>H2 ##</b>
                </li>
              )}
            </EditorLineMarker>
            <EditorLineMarker marker="### ">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  <b>H3 ###</b>
                </li>
              )}
            </EditorLineMarker>
            <EditorLineMarker marker="#### ">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  <b>H4 ####</b>
                </li>
              )}
            </EditorLineMarker>
          </ul>
        </EditorMenuDropdown>
      </ul>
      <ul className="tme-menu-group left">
        <EditorMenuDropdown
          className="tme-material-icon"
          text={
            <img
              alt=""
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0yNCAyNEgwVjBoMjR2MjR6Ii8+PC9kZWZzPjxjbGlwUGF0aCBpZD0iYiI+PHVzZSB4bGluazpocmVmPSIjYSIgb3ZlcmZsb3c9InZpc2libGUiLz48L2NsaXBQYXRoPjxwYXRoIGNsaXAtcGF0aD0idXJsKCNiKSIgZD0iTTIuNSA0djNoNXYxMmgzVjdoNVY0aC0xM3ptMTkgNWgtOXYzaDN2N2gzdi03aDNWOXoiLz48L3N2Zz4="
            />
          }
        >
          <ul>
            <EditorMarker prefix="**" suffix="**" defaultText="bold">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  <b>Bold</b>
                </li>
              )}
            </EditorMarker>
            <EditorMarker prefix="*" suffix="*" defaultText="italic">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  <i>Italic</i>
                </li>
              )}
            </EditorMarker>
            <EditorMarker prefix="~~" suffix="~~" defaultText="default">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  <del>Strikethrough</del>
                </li>
              )}
            </EditorMarker>
            <EditorLineMarker marker="> ">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  Blockquote
                </li>
              )}
            </EditorLineMarker>
            <EditorMarker prefix="`" suffix="`" defaultText="code">
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  Inline Code
                </li>
              )}
            </EditorMarker>
            <EditorMarker prefix="```" suffix="```" defaultText="code" multipleLine>
              {mark => (
                <li className="tme-menu-item" onClick={mark}>
                  Code
                </li>
              )}
            </EditorMarker>
          </ul>
        </EditorMenuDropdown>
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
      <ul className="tme-menu-group left">
        <EditorMarker prefix="[" suffix="](url)" defaultText="text">
          {mark => (
            <li className="tme-menu-item tme-material-icon" onClick={mark}>
              <img
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTMuOSAxMmMwLTEuNzEgMS4zOS0zLjEgMy4xLTMuMWg0VjdIN2MtMi43NiAwLTUgMi4yNC01IDVzMi4yNCA1IDUgNWg0di0xLjlIN2MtMS43MSAwLTMuMS0xLjM5LTMuMS0zLjF6TTggMTNoOHYtMkg4djJ6bTktNmgtNHYxLjloNGMxLjcxIDAgMy4xIDEuMzkgMy4xIDMuMXMtMS4zOSAzLjEtMy4xIDMuMWgtNFYxN2g0YzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01eiIvPjwvc3ZnPg=="
              />
            </li>
          )}
        </EditorMarker>
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
