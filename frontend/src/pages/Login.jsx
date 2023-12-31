import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { apiHandlers } from '../utils/HandleApi';

const InputItem = ({ children, type, name, value, onChange }) => {
  return (
    <div className='text-left md:text-right'>
      <label className='block my-2 md:inline-block font-bold'>{children}</label>
      <input
        className='mb-4 p-2 md:mx-3 rounded-full h-10 w-full md:w-80 hover:drop-shadow-sm border-2 border-wheat'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: '',
    password: ''
  });

  const { username, password } = inputValues;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: 'bottom-right'
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: 'top-right'
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await apiHandlers.login(inputValues);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
    }
    setInputValues({
      ...inputValues,
      username: '',
      password: ''
    });
  };

  return (
    <div className='w-full h-screen mx-auto p-6'>
      <div className='mt-40 flex justify-center'>
        <div className='md:p-8 md:rounded md:shadow-2xl'>
          <form onSubmit={handleSubmitForm}>
            <div className='text-center mb-12'>
              <span className='text-3xl font-bold'>Login</span>
            </div>
            <InputItem
              children='Username:'
              type='text'
              name='username'
              value={username}
              onChange={handleOnChange}
            />
            <InputItem
              children='Password:'
              type='password'
              name='password'
              value={password}
              onChange={handleOnChange}
            />
            <div className='text-right md:mr-3'>
              <button className='bg-white px-4 py-2 rounded-full hover:font-bold tracking-wider shadow-md hover:drop-shadow-sm border-2 border-wheat'>
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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
