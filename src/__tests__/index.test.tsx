import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TextareaMarkdownEditor from '../TextareaMarkdownEditor';

describe('TextareaMarkdownEditor', () => {
  test('TextareaMarkdownEditor should initialize as it is', () => {
    const component = renderer.create(
      <TextareaMarkdownEditor
        id="container"
        doParse={it => it}
        textareaId="textarea"
        className="mock-container"
        style={{ width: '100%' }}
        textareaStyle={{ width: '90%' }}
      />,
    );
    const testInstance = component.root;
    const { props } = testInstance.findByType(TextareaMarkdownEditor);
    expect(props.id).toBe('container');

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
