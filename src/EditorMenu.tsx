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
                long: <b>Header1</b>,
                marker: '# ',
                short: <b>H1</b>,
                type: 'line-marker',
              },
              {
                key: 'h2',
                long: <b>Header2</b>,
                marker: '## ',
                short: <b>H2 #</b>,
                type: 'line-marker',
              },
              {
                key: 'h3',
                long: <b>Header3</b>,
                marker: '### ',
                short: <b>H3 #</b>,
                type: 'line-marker',
              },
              {
                key: 'h4',
                long: <b>Header4</b>,
                marker: '#### ',
                short: <b>H4 #</b>,
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
                long: <b>{languages[language].bold}</b>,
                prefix: '**',
                suffix: '**',
                type: 'marker',
              },
              {
                defaultText: 'italic',
                key: 'italic',
                long: <i>${languages[language].italic}</i>,
                prefix: '*',
                suffix: '*',
                type: 'marker',
              },
              {
                defaultText: 'strikethrough',
                key: 'strikethrough',
                long: <del>{languages[language].strikethrough}</del>,
                prefix: '~~',
                suffix: '~~',
                type: 'marker',
              },
              {
                key: 'blockquote',
                long: languages[language].blockquote,
                marker: '> ',
                type: 'line-marker',
              },
              {
                defaultText: 'inline code',
                key: 'inline-code',
                long: languages[language].inlineCode,
                prefix: '`',
                suffix: '`',
                type: 'marker',
              },
              {
                defaultText: 'code',
                key: 'code',
                long: languages[language].inlineCode,
                multipleLine: true,
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
            long: <img alt="" src={unorderedListIcon} />,
            marker: '* ',
            type: 'line-marker',
          },
          {
            key: 'ordered-list',
            long: <img alt="" src={orderedListIcon} />,
            marker: '1. ',
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
            long: <img alt="" src={linkIcon} />,
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
                      <EditorLineMarker key={marker.key} marker={marker.marker}>
                        {mark => (
                          <li className="tme-menu-item" onClick={mark}>
                            <span className="tme-menu-item-inner">{marker.short || marker.long}</span>
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
                      >
                        {mark => (
                          <li className="tme-menu-item" onClick={mark}>
                            <span className="tme-menu-item-inner">{marker.short || marker.long}</span>
                          </li>
                        )}
                      </EditorMarker>
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
