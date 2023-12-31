import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiHandlers } from '../utils/HandleApi';
import { ToastContainer, toast } from 'react-toastify';
import BASE_URL from '../utils/HandleApi';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');

  useEffect(() => {
    const fetchPostId = async () => {
      try {
        const fetchedPostId = await apiHandlers.getSinglePost(id);
        setTitle(fetchedPostId.title);
        setDescription(fetchedPostId.description);
        setFile(fetchedPostId.file);
        setCover(fetchedPostId.file);
        setContent(fetchedPostId.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostId();
  }, [id]);

  const handleUpdateForm = async (e) => {
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
      const { status, message } = await apiHandlers.editPost(formData, id);
      if (status) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/post/' + id);
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full h-screen  mx-auto p-6'>
      <div className='flex justify-center'>
        <div className='mt-28 lg:mx-40 w-full p-2 md:w-5/6 lg:w-1/2'>
          <div className='text-center mb-8'>
            <span className='font-bold border-b-2 p-2 border-coffee'>
              Edit Your Post
            </span>
          </div>
          <form onSubmit={handleUpdateForm}>
            <input
              className='block rounded mb-4 p-2 w-full bg-classic-gray'
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={'Title'}
            />
            <input
              className='block rounded mb-4 p-2 w-full bg-classic-gray'
              type='text'
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={'Description'}
            />
            <input
              className='mb-4 w-full '
              type='file'
              name='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              src={`${BASE_URL}/uploads/${cover}`}
              alt='current'
              className='mb-4 rounded max-h-32'
            />
            <div className='h-48 md:h-80'>
              <textarea
                className='rounded p-2 w-full h-full bg-classic-gray'
                placeholder='Content'
                name='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className='mt-4'>
              <button className='p-2 w-full border-2 border-coffee rounded-full md:p-2 hover:font-bold'>
                Update Post
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditPost;
