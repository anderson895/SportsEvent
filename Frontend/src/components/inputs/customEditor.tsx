/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent } from 'react';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomLabel from '../label/customLabel';

const QUILL_FORMATS = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
];

const QUILL_MODULES = {
toolbar: [
  [{ header: '1' }, { header: '2' }, { font: [] }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
],
clipboard: {
  matchVisual: false,
},
};

interface ICustomTextEditorProps {
  onChange?: ((e: ChangeEvent<HTMLInputElement> | any) => void) | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  classes?: string | any;
  label?: string;
  error?: string;
  style?: React.CSSProperties
}

function CustomTextEditor(props: ICustomTextEditorProps) {
  return (
    <div>
      {props.label && (
        <CustomLabel
          children={props.label}
          variant="text"
          classes="font-semibold mb-2"
        />
      )}
      <ReactQuill
        className={clsx(props.classes)}
        theme="snow"
        formats={QUILL_FORMATS}
        modules={QUILL_MODULES}
        style={props.style}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={(value) => props.onChange && props.onChange(value)}
      />
      {props.error && <CustomLabel children={props.error} variant="text" />}
    </div>
  );
}

export default CustomTextEditor;
