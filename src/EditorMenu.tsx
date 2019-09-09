import * as React from 'react';
import EditorLineMarker from './EditorLineMarker';
import EditorMarker from './EditorMarker';
import EditorMenuDropdown from './EditorMenuDropdown';
// @ts-ignore
import linkIcon from './icon/link.svg';
// @ts-ignore
import orderedListIcon from './icon/ordered-list.svg';
// @ts-ignore
import textIcon from './icon/text.svg';
// @ts-ignore
import unorderedListIcon from './icon/unordered-list.svg';

import languages from './lang.json';

export interface IEditorMenuProps {
  isEditing?: boolean;
  toggleEdit?: () => void;
  language: string;
  readOnly: boolean;
}

const EditorMenu: React.FunctionComponent<IEditorMenuProps> = props => {
  const { toggleEdit, isEditing, language, readOnly } = props;
  const markers = [
    {
      markers: [
        {
          marker: '# ',
          short: <b>H1 #</b>,
          type: 'line-marker',
        },
        {
          marker: '## ',
          short: <b>H2 #</b>,
          type: 'line-marker',
        },
        {
          marker: '### ',
          short: <b>H3 #</b>,
          type: 'line-marker',
        },
      ],
      type: 'group',
    },
  ];
  return (
    <div className="tme-menu">
      {isEditing && (
        <>
          <ul className="tme-menu-group left">
            <EditorMenuDropdown title={languages[language].headers} text={<b>H1</b>}>
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
              title={languages[language].text}
              text={<img alt="" src={textIcon} />}
            >
              <ul>
                <EditorMarker prefix="**" suffix="**" defaultText="bold">
                  {mark => (
                    <li className="tme-menu-item" onClick={mark}>
                      <b>{languages[language].bold}</b>
                    </li>
                  )}
                </EditorMarker>
                <EditorMarker prefix="*" suffix="*" defaultText="italic">
                  {mark => (
                    <li className="tme-menu-item" onClick={mark}>
                      <i>{languages[language].italic}</i>
                    </li>
                  )}
                </EditorMarker>
                <EditorMarker prefix="~~" suffix="~~" defaultText="default">
                  {mark => (
                    <li className="tme-menu-item" onClick={mark}>
                      <del>{languages[language].strikethrough}</del>
                    </li>
                  )}
                </EditorMarker>
                <EditorLineMarker marker="> ">
                  {mark => (
                    <li className="tme-menu-item" onClick={mark}>
                      {languages[language].blockquote}
                    </li>
                  )}
                </EditorLineMarker>
                <EditorMarker prefix="`" suffix="`" defaultText="code">
                  {mark => (
                    <li className="tme-menu-item" onClick={mark}>
                      {languages[language].inlineCode}
                    </li>
                  )}
                </EditorMarker>
                <EditorMarker prefix="```" suffix="```" defaultText="code" multipleLine>
                  {mark => (
                    <li className="tme-menu-item" onClick={mark}>
                      {languages[language].code}
                    </li>
                  )}
                </EditorMarker>
              </ul>
            </EditorMenuDropdown>
          </ul>
          <ul className="tme-menu-group left">
            <EditorLineMarker marker="* ">
              {mark => (
                <li
                  title={languages[language].unorderedList}
                  className="tme-menu-item tme-material-icon"
                  onClick={mark}
                >
                  <img alt="" src={unorderedListIcon} />
                </li>
              )}
            </EditorLineMarker>
            <EditorLineMarker marker="1. ">
              {mark => (
                <li title={languages[language].orderedList} className="tme-menu-item tme-material-icon" onClick={mark}>
                  <img alt="" src={orderedListIcon} />
                </li>
              )}
            </EditorLineMarker>
          </ul>
          <ul className="tme-menu-group left">
            <EditorMarker prefix="[" suffix="](url)" defaultText="text">
              {mark => (
                <li title={languages[language].link} className="tme-menu-item tme-material-icon" onClick={mark}>
                  <img alt="" src={linkIcon} />
                </li>
              )}
            </EditorMarker>
          </ul>
        </>
      )}
      <ul className="tme-menu-group right">
        <li className="tme-menu-item tme-link">
          <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
            <b>?</b>
          </a>
        </li>
        {!readOnly && (
          <li className="tme-menu-item" onClick={() => toggleEdit!()}>
            {isEditing ? languages[language].preview : languages[language].edit}
          </li>
        )}
      </ul>
    </div>
  );
};

export default EditorMenu;
