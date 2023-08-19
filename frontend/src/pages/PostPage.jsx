import { useEffect, useState } from 'react';
import { apiHandlers } from '../utils/HandleApi';
import { useParams } from 'react-router-dom';
import BASE_URL from '../utils/HandleApi';
import { format } from 'date-fns';

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const fetchedSinglePost = await apiHandlers.getSinglePost(id);
        setPostInfo(fetchedSinglePost);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSinglePost();
  }, [id]);

  return (
    <div className='flex justify-center h-full'>
      <div className='mt-20 pb-20'>
        {postInfo && (
          <div className='mt-10 max-w-[640px] md:max-w-[800px] h-2/3'>
            <div className='flex justify-center my-2'>
              <span className='sm:text-2xl text-lg font-bold'>
                {postInfo.title}
              </span>
            </div>
            <div className='text-center text-sm my-2'>
              <p className='mt-2 mr-4 font-bold'>
                by {postInfo.author.username}
              </p>
              <time>
                {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}
              </time>
            </div>
            <div className='border-2'>
              <img
                src={`${BASE_URL}/uploads/` + postInfo.file}
                className='rounded drop-shadow-md object-fill w-screen max-h-[280px]'
                alt='post'
              />
            </div>
            <div className='mt-4'>
              <div>
                <p className='mt-2 sm:text-lg text-sm'>
                  {postInfo.description}
                </p>
              </div>
              <div className='mt-2'>
                <p>{postInfo.content}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
