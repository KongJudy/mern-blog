import { Link } from 'react-router-dom';
import BASE_URL from '../utils/HandleApi';
import { format } from 'date-fns';

const Post = ({ post }) => {
  const lessContent = post.content.slice(0, 200);

  return (
    <div className='mb-6 col-span-3 max-w-[640px] md:max-w-[700px] h-2/3'>
      <div className=''>
        <Link to={`/post/${post._id}`}>
          <img
            src={`${BASE_URL}/uploads/` + post.file}
            className='rounded drop-shadow-md object-cover w-full h-[400px]'
            alt='post'
          />
        </Link>
      </div>
      <div className='mt-4 max-w-[640px] md:max-w-[700px]'>
        <Link to={`/post/${post._id}`}>
          <span className='sm:text-2xl text-lg font-bold'>{post.title}</span>
        </Link>
        <div className='text-sm'>
          <p className='mt-2 mr-4 font-bold'>{post.author.username}</p>
          <time>{format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}</time>
        </div>
        <p className='mt-2 sm:text-lg text-sm'>{post.description}</p>
      </div>
      <div className='mt-2'>
        <p>{lessContent} ...</p>
      </div>
    </div>
  );
};

export default Post;
