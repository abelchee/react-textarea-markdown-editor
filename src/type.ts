export interface IMarker {
  key: string;
  type: 'marker';
  prefix: string;
  suffix: string;
  multipleLine?: boolean;
  short?: any;
  long?: any;
  defaultText?: string;
}

export interface ILineMarker {
  key: string;
  type: 'line-marker';
  marker: string;
  long?: any;
  short?: any;
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
