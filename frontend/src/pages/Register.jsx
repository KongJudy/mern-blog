import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const InputItem = ({ children, type, name, value, onChange }) => {
  return (
    <div className='text-left md:text-right'>
      <label className='block my-2 md:inline-block font-bold'>{children}</label>
      <input
        className='mb-4 p-2 md:mx-3 rounded h-10 w-full md:w-80 hover:drop-shadow-sm'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: '',
    username: '',
    password: ''
  });

  const { email, username, password } = inputValues;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  // TOAST SUCCESS/ERROR MESSAGE
  const handleError = (err) => {
    toast.error(err, {
      position: 'bottom-right'
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: 'bottom-right'
    });
  };

  // SUBMIT FORM HANDLER
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:4000/register',
        {
          ...inputValues
        },
        { withCredentials: true }
      );
      const { success, message } = data;
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
      email: '',
      username: '',
      password: ''
    });
  };

  return (
    <div className='w-full mx-auto pt-6'>
      <div className='mt-40 flex justify-center'>
        <div className='md:p-8 md:rounded md:shadow-2xl'>
          <form onSubmit={handleSubmitForm}>
            <div className='text-center mb-12'>
              <span className='text-3xl font-bold'>Register</span>
            </div>
            <InputItem
              children='Email:'
              type='email'
              name='email'
              value={email}
              onChange={handleOnChange}
            />
            <InputItem
              children='Username:'
              type='username'
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
              <button
                type='submit'
                className='bg-white px-4 py-2 rounded hover:font-bold tracking-wider shadow-md hover:drop-shadow-sm'
              >
                Register
              </button>
              <div className='pt-4'>
                <span className='text-sm'>
                  Already a member? Click{' '}
                  <Link to='/login' className='font-semibold hover:font-bold'>
                    Login
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

export default Register;
