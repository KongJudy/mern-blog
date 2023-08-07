import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { apiHandlers } from '../utils/HandleApi';
import { ToastContainer, toast } from 'react-toastify';

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
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const handleError = (err) => {
      toast.error(err, {
        position: 'top-right'
      });
    };

    const handleSuccess = (msg) => {
      toast.success(msg, {
        position: 'top-right'
      });
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('content', content);

    try {
      const { success, message } = await apiHandlers.createPost(formData);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
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
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={'Title'}
            />
            <input
              className='block rounded mb-4 p-2 w-full'
              type='text'
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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
