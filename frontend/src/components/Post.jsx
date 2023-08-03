const Post = () => {
  return (
    <div className='mb-6 col-span-3 md:mx-8'>
      <div className='max-w-[640px] md:max-w-[700px] '>
        <img
          src='https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
          className='rounded drop-shadow-md object-scale-down'
          alt='keyboard'
        />
      </div>
      <div className='mt-4 max-w-[640px] md:max-w-[700px]'>
        <span className='sm:text-2xl text-lg font-bold'>
          Cursus mattis morastie a adipiscing commodo
        </span>
        <p className='text-sm'>
          <button className='mt-2 mr-4 font-bold'>Judy Kong</button>
          <time>08-01-2023 12:27</time>
        </p>
        <p className='mt-2 sm:text-lg text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum
          tempus egestas sed sed. Lacus sed turpis tincidunt id aliquet risus
          feugiat in ante.
        </p>
      </div>
    </div>
  );
};

export default Post;
