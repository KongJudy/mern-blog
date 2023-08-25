import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiHandlers } from '../utils/HandleApi';
import Post from '../components/Post';

const Profile = () => {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await apiHandlers.getUserPosts(id);
        const { posts } = response;
        setUserPosts(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPosts();
  }, [id]);

  return (
    <div className='flex justify-center pb-12'>
      <div className='mt-24 mx-2 lg:grid grid-cols-6 gap-20 lg:mx-40'>
        {userPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
