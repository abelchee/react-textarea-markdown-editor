import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileReader from 'promise-file-reader';
import getConfig from './config';
import { Icon } from 'semantic-ui-react';
import TextareaMarkdownEditor from 'react-textarea-markdown-editor';
import md from '../md';

function CustomizedMarkdownEditor (props) {
  const { language = 'en' } = props;
  const [images, setImages] = useState([]);
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: 'image/jpeg, image/png',
    onDropAccepted: async (files) => {
      const data = await FileReader.readAsDataURL(files[0]);
      editorRef.current.mark('![', `][image${images.length + 1}]`, 'alt text');
      setImages([...images, data]);
    },
  });
  const editorRef = useRef(null);

  const markers = [
    ...getConfig(language),
    {
      key: 'images',
      markers: [
        {
          key: 'images',
          markers: [
            {
              key: 'open',
              name: <Icon name="image" fitted size="large" onClick={open}/>,
              title: 'Open file',
              type: 'component',
            },
            ...images.map((data, index) => ({
              defaultText: 'alt text',
              key: `image${index + 1}`,
              name: `image${index + 1}`,
              prefix: '![',
              suffix: `][image${index + 1}]`,
              title: `image${index + 1}`,
              type: 'marker',
            })),
          ],
          type: 'dropdown',
        },
      ],
    },
  ];

  async function onPaste (e) {
    if (!e.clipboardData) {
      return;
    }
    const items = e.clipboardData.items;
    if (!items) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf('image') === -1) continue;
      // Retrieve image on clipboard as blob
      const file = items[i].getAsFile();
      console.log(items[i]);
      if (file) {
        e.preventDefault();
        e.stopPropagation();
        // File name
        console.log(e.clipboardData.getData('Text'));
        const data = await FileReader.readAsDataURL(file);
        console.log(data);
        editorRef.current.mark('![', `][image${images.length + 1}]`, 'alt text');
        setImages([...images, data]);
      }
    }
  }

  return (
    <div {...getRootProps({ className: 'dropzone' })} className={isDragActive ? 'dropping' : ''}>
      <input {...getInputProps()} />
      <TextareaMarkdownEditor ref={editorRef} markers={markers} language={language} rows={10}
                              placeholder="You can paste or drag your image here!"
                              doParse={text => md.render(`${text}\n\n${images.map((data, index) => `[image${index + 1}]: ${data}`).join('\n\n')}`)}
                              onPaste={onPaste}/>
    </div>
  );
}

export default CustomizedMarkdownEditor;