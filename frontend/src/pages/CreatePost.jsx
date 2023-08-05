import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(description);
    console.log(file);
    console.log(content);

    axios
      .post('http://localhost:4000/create', {
        title,
        description,
        file,
        content
      })
      .then((res) => {
        if (res.data === 'Success') {
          window.location.href = '/';
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='w-full mx-auto p-6'>
      <div className='flex justify-center'>
        <div className='mt-28 lg:mx-40 w-full p-2 md:w-5/6 lg:w-1/2'>
          <div className='text-center mb-8'>
            <span className='font-bold border-b-2 p-2 border-coffee'>
              Create New Post
            </span>
          </div>
          <form onSubmit={handleFormSubmit}>
            <input
              className='block rounded mb-4 p-2 w-full'
              type='title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={'Title'}
            />
            <input
              className='block rounded mb-4 p-2 w-full'
              type='description'
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={'Description'}
            />
            <input
              className='mb-4 w-full'
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <ReactQuill
              className='h-36 md:h-80 '
              theme='snow'
              value={content}
              onChange={(newValue) => setContent(newValue)}
              modules={modules}
              formats={formats}
            />
            <div className='mt-36 md:mt-20'>
              <button className='p-2 w-full border-2 border-coffee rounded md:p-2 hover:font-bold'>
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
