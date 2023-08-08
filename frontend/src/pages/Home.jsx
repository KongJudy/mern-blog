import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { apiHandlers } from '../utils/HandleApi';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await apiHandlers.getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='mt-24 mx-2 lg:grid grid-cols-6 gap-20 lg:mx-40'>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
