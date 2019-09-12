import * as React from 'react';

export interface IMarker {
  key: string;
  type: 'marker';
  prefix: string;
  suffix: string;
  multipleLine?: boolean;
  long?: string | React.ReactElement;
  defaultText?: string;
}

export interface ILineMarker {
  key: string;
  type: 'line-marker';
  marker: string;
  long?: string | React.ReactElement;
}

export interface IDropdown {
  key: string;
  type: 'dropdown';
  markers: Array<IMarker | ILineMarker>;
}

export interface IMarkerGroup {
  type: 'group';
  key: string;
  markers: Array<IMarker | ILineMarker | IDropdown>;
}
