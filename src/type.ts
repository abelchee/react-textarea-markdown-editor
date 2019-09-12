import * as React from 'react';

export interface IMarker {
  key: string;
  type: 'marker';
  prefix: string;
  suffix: string;
  multipleLine?: boolean;
  name?: string | React.ReactElement;
  defaultText?: string;
  title?: string;
}

export interface ITemplateMarker {
  key: string;
  type: 'template';
  template: string;
  multipleLine?: boolean;
  name?: string | React.ReactElement;
  title?: string;
}

export interface ILineMarker {
  key: string;
  type: 'line-marker';
  marker: string;
  name?: string | React.ReactElement;
  title?: string;
}

export interface IDropdown {
  key: string;
  type: 'dropdown';
  markers: Array<IMarker | ILineMarker | ITemplateMarker>;
}

export interface IMarkerGroup {
  type: 'group';
  key: string;
  markers: Array<IMarker | ILineMarker | ITemplateMarker | IDropdown>;
}
