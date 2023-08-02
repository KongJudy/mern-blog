import Post from '../components/Post';

const Home = () => {
  return (
    <div className='flex justify-center'>
      <div className='mt-24 mx-2 md:grid grid-cols-6 gap-2 lg:mx-40'>
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Home;
