import * as React from 'react';

export interface ICmp {
  key: string;
  type: 'component';
  title?: string;
  name: string | React.ReactElement;
}

export interface IMarker {
  key: string;
  type: 'marker';
  prefix: string;
  suffix: string;
  multipleLine?: boolean;
  name: string | React.ReactElement;
  defaultText?: string;
  title?: string;
}

export interface ITemplateMarker {
  key: string;
  type: 'template';
  template: string;
  multipleLine?: boolean;
  name: string | React.ReactElement;
  title?: string;
}

export interface ILineMarker {
  key: string;
  type: 'line-marker';
  marker: string;
  name: string | React.ReactElement;
  title?: string;
}

export interface IDropdown {
  key: string;
  type: 'dropdown';
  markers: (IMarker | ILineMarker | ITemplateMarker | ICmp)[];
}

export interface IMarkerGroup {
  key: string;
  markers: (IMarker | ILineMarker | ITemplateMarker | IDropdown | ICmp)[];
}
