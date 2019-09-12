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
import { IMarkerGroup } from './type';

export interface IEditorMenuProps {
  isEditing?: boolean;
  toggleEdit?: () => void;
  language: string;
  readOnly: boolean;
  markers?: IMarkerGroup[];
}

const EditorMenu: React.FunctionComponent<IEditorMenuProps> = props => {
  const { toggleEdit, isEditing, language, readOnly } = props;
  let { markers } = props;
  if (!markers) {
    markers = [
      {
        key: 'header',
        markers: [
          {
            key: 'header',
            markers: [
              {
                key: 'h1',
                marker: '# ',
                name: <b>H1</b>,
                type: 'line-marker',
              },
              {
                key: 'h2',
                marker: '## ',
                name: <b>H2</b>,
                type: 'line-marker',
              },
              {
                key: 'h3',
                marker: '### ',
                name: <b>H3</b>,
                type: 'line-marker',
              },
              {
                key: 'h4',
                marker: '#### ',
                name: <b>H4</b>,
                type: 'line-marker',
              },
            ],
            type: 'dropdown',
          },
        ],
        type: 'group',
      },
      {
        key: 'text',
        markers: [
          {
            key: 'text',
            markers: [
              {
                defaultText: 'bold',
                key: 'bold',
                name: <b>{languages[language].bold}</b>,
                prefix: '**',
                suffix: '**',
                type: 'marker',
              },
              {
                defaultText: 'italic',
                key: 'italic',
                name: <i>{languages[language].italic}</i>,
                prefix: '*',
                suffix: '*',
                type: 'marker',
              },
              {
                defaultText: 'strikethrough',
                key: 'strikethrough',
                name: <del>{languages[language].strikethrough}</del>,
                prefix: '~~',
                suffix: '~~',
                type: 'marker',
              },
              {
                key: 'blockquote',
                marker: '> ',
                name: languages[language].blockquote,
                type: 'line-marker',
              },
              {
                defaultText: 'inline code',
                key: 'inline-code',
                name: languages[language].inlineCode,
                prefix: '`',
                suffix: '`',
                type: 'marker',
              },
              {
                defaultText: 'code',
                key: 'code',
                multipleLine: true,
                name: languages[language].code,
                prefix: '```',
                suffix: '```',
                type: 'marker',
              },
            ],
            type: 'dropdown',
          },
        ],
        type: 'group',
      },
      {
        key: 'list',
        markers: [
          {
            key: 'unordered-list',
            marker: '* ',
            name: <img alt="" src={unorderedListIcon} />,
            type: 'line-marker',
          },
          {
            key: 'ordered-list',
            marker: '1. ',
            name: <img alt="" src={orderedListIcon} />,
            type: 'line-marker',
          },
        ],
        type: 'group',
      },
      {
        key: 'additional',
        markers: [
          {
            defaultText: 'text',
            key: 'link',
            name: <img alt="" src={linkIcon} />,
            prefix: '[',
            suffix: '](url)',
            type: 'marker',
          },
        ],
        type: 'group',
      },
    ];
  }
  return (
    <div className="tme-menu">
      {isEditing && (
        <>
          {markers.map(group => (
            <ul key={group.key} className="tme-menu-group left">
              {group.markers.map(marker => {
                switch (marker.type) {
                  case 'line-marker':
                    return (
                      <li className="tme-menu-item" key={marker.key}>
                        <EditorLineMarker config={marker} />
                      </li>
                    );
                  case 'marker':
                    return (
                      <li className="tme-menu-item" key={marker.key}>
                        <EditorMarker config={marker} />
                      </li>
                    );
                  case 'dropdown':
                    return <EditorMenuDropdown key={marker.key} config={marker} />;
                }
                return;
              })}
            </ul>
          ))}
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
            <span className="tme-menu-item-inner">
              {isEditing ? languages[language].preview : languages[language].edit}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default EditorMenu;
