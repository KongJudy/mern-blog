import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InputItem = ({ children, type, value, onChange }) => {
  return (
    <div className='text-left md:text-right'>
      <label className='block my-2 md:inline-block font-bold'>{children}</label>
      <input
        className='mb-4 p-2 md:mx-3 rounded h-10 w-full md:w-80 hover:drop-shadow-sm'
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post('', { username, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className='w-full mx-auto p-6'>
      <div className='mt-40 flex justify-center'>
        <div className='md:p-8 md:rounded md:shadow-2xl'>
          <form onSubmit={() => handleSubmitForm}>
            <div className='text-center mb-12'>
              <span className='text-3xl font-bold'>Login</span>
            </div>
            <InputItem
              children='Username:'
              type='user'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputItem
              children='Password:'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='text-right md:mr-3'>
              <button className='bg-white px-4 py-2 rounded hover:font-bold tracking-wider shadow-md hover:drop-shadow-sm'>
                Login
              </button>
              <div className='pt-4'>
                <span className='text-sm'>
                  Create an Account? Click{' '}
                  <Link
                    to='/register'
                    className='font-semibold hover:font-bold'
                  >
                    Register
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
