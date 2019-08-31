import * as React from 'react';

export interface ITextareaMarkdownEditor {
  id: string | undefined;
}

export default class TextareaMarkdownEditor extends React.Component<ITextareaMarkdownEditor> {
  public static defaultProps = {
    id: undefined,
  };

  constructor(props: ITextareaMarkdownEditor) {
    super(props);
  }

  public render() {
    return <div id={this.props.id} />;
  }
}
