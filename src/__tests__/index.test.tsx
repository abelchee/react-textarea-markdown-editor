import { mount } from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TextareaMarkdownEditor from '../index';

describe('TextareaMarkdownEditor', () => {
  test('should have english words displayed', () => {
    const component = renderer.create(
      <TextareaMarkdownEditor
        id="container"
        doParse={it => it}
        textareaId="textarea"
        className="mock-container"
        style={{ width: '100%' }}
        textareaStyle={{ width: '90%' }}
        value="1. Header"
        defaultValue="1. Header"
        rows={10}
        autoFocus
      />,
    );
    const testInstance = component.root;
    const { props } = testInstance.findByType(TextareaMarkdownEditor);
    expect(props.id).toBe('container');

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should have Chinese words displayed', () => {
    const component = renderer.create(
      <TextareaMarkdownEditor
        id="container"
        doParse={it => it}
        textareaId="textarea"
        className="mock-container"
        style={{ width: '100%' }}
        textareaStyle={{ width: '90%' }}
        value="1. Header"
        defaultValue="1. Header"
        rows={10}
        autoFocus
        language="zh"
      />,
    );
    const testInstance = component.root;
    const { props } = testInstance.findByType(TextareaMarkdownEditor);
    expect(props.id).toBe('container');

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('template', () => {
    const component = renderer.create(
      <TextareaMarkdownEditor
        doParse={it => it}
        markers={[
          {
            key: 'g',
            markers: [
              {
                key: 't',
                multipleLine: true,
                name: 'template',
                template: '[]()',
                title: 'template',
                type: 'template',
              },
            ],
          },
        ]}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('line-marker', () => {
    const wrapper = mount(<TextareaMarkdownEditor doParse={it => it} />);
    const header2 = wrapper.find('li[title="<h2></h2>"]');
    expect(header2.length).toBe(1);
    header2.find('span').simulate('click');
    expect(wrapper.find('textarea').props().value).toBe('## ');
  });
  test('marker', () => {
    const wrapper = mount(<TextareaMarkdownEditor doParse={it => it} />);
    const header2 = wrapper.find('li[title="Italic"]');
    expect(header2.length).toBe(1);
    header2.find('span').simulate('click');
    expect(wrapper.find('textarea').props().value).toBe('*italic*');
  });
  test('template', () => {
    const wrapper = mount(
      <TextareaMarkdownEditor
        doParse={it => it}
        markers={[
          {
            key: 'g',
            markers: [
              {
                key: 't',
                multipleLine: true,
                name: 'template',
                template: '[]()',
                title: 'template',
                type: 'template',
              },
            ],
          },
        ]}
      />,
    );
    const header2 = wrapper.find('li[title="template"]');
    expect(header2.length).toBe(1);
    header2.find('span').simulate('click');
    expect(wrapper.find('textarea').props().value).toBe('\n[]()\n');
  });
});
