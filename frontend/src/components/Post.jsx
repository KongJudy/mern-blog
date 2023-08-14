import BASE_URL from '../utils/HandleApi';
import { format } from 'date-fns';

const Post = ({ post }) => {
  return (
    <div className='mb-6 col-span-3'>
      <div className='max-w-[640px] md:max-w-[700px] h-2/3'>
        <img
          src={`${BASE_URL}/uploads/` + post.file}
          className='rounded drop-shadow-md object-cover w-full h-full'
          alt='post'
        />
      </div>
      <div className='mt-4 max-w-[640px] md:max-w-[700px]'>
        <span className='sm:text-2xl text-lg font-bold'>{post.title}</span>
        <p className='text-sm'>
          <button className='mt-2 mr-4 font-bold'>
            {post.author.username}
          </button>
          <time>{format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className='mt-2 sm:text-lg text-sm'>{post.description}</p>
      </div>
      <div className='mt-2'>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
