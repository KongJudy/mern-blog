import BASE_URL from '../utils/HandleApi';
import { format } from 'date-fns';

const Post = ({ post }) => {
  return (
    <div className='mb-6 col-span-3 md:mx-8'>
      <div className='max-w-[640px] md:max-w-[700px]'>
        <img
          src={`${BASE_URL}/uploads/` + post.file}
          className='rounded drop-shadow-md object-cover max-w-full max-h-[400px]'
          alt='post'
        />
      </div>
      <div className='mt-4 max-w-[640px] md:max-w-[700px]'>
        <span className='sm:text-2xl text-lg font-bold'>{post.title}</span>
        <p className='text-sm'>
          <button className='mt-2 mr-4 font-bold'>Judy Kong</button>
          <time>{format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className='mt-2 sm:text-lg text-sm'>{post.description}</p>
      </div>
      <div>{post.content}</div>
    </div>
  );
};

export default Post;
