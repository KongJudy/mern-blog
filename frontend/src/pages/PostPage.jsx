import { useEffect, useState } from 'react';
import { apiHandlers } from '../utils/HandleApi';
import { Link, useParams } from 'react-router-dom';
import BASE_URL from '../utils/HandleApi';
import { format } from 'date-fns';

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [user, setUser] = useState('');

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await apiHandlers.getUser();
        setUser(fetchedUser.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  if (!postInfo) {
    return <div>Loading...</div>;
  }

  const isAuthor = user && postInfo.author.username === user;

  return (
    <div className='flex justify-center'>
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
              <div className='my-2'>
                {isAuthor && (
                  <Link to={`/edit/${postInfo._id}`}>
                    <div className='flex justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='mt-1 w-5 h-5 mr-1'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                        />
                      </svg>

                      <span className='bg-wheat p-1 px-3 rounded-full font-bold hover:bg-coffee hover:text-white'>
                        Edit Post
                      </span>
                    </div>
                  </Link>
                )}
              </div>
              <time>
                {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}
              </time>
            </div>
            <div className='border-2 md:max-w-[800px]'>
              <img
                src={`${BASE_URL}/uploads/` + postInfo.file}
                className='rounded drop-shadow-md object-fill w-full max-h-[280px]'
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
