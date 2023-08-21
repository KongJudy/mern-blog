import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenuAlt1, HiOutlineX } from 'react-icons/hi';
import { useCookies } from 'react-cookie';
import { apiHandlers } from '../utils/HandleApi';
import { UserContext } from '../utils/UserContext';

const MenuIcon = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className='flex items-center px-3 py-2'>
      <HiMenuAlt1 size={20} className={`${isOpen ? 'hidden' : 'block'}`} />
      <HiOutlineX size={20} className={`${isOpen ? 'block' : 'hidden'}`} />
    </button>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await apiHandlers.getUser();
        setUserInfo(fetchedUser.user);
        if (!fetchedUser.status) {
          removeCookie('token');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [cookies, removeCookie, navigate, setUserInfo]);

  const handleLogout = () => {
    removeCookie('token');
    setTimeout(() => {
      setUserInfo(null);
      navigate('/');
    }, 500);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className='w-full fixed z-50 top-0 bg-wheat flex justify-between p-6 lg:px-40'>
      <Link to='/'>
        <span className='font-playfair font-bold text-2xl'>Blogger</span>
      </Link>

      <div
        className={`md:flex md:items-center md:w-auto ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        {userInfo ? (
          <div className='mt-12 md:mt-0 text-center'>
            <div className='block mt-4 md:inline-block md:mt-0 md:mr-8'>
              <Link
                to='/'
                className='inline-block hover:scale-110 hover:font-bold'
                onClick={closeMenu}
              >
                Home
              </Link>
            </div>
            <div className='block mt-4 md:inline-block md:mt-0 md:mr-8'>
              <Link
                to='/create'
                className='inline-block hover:scale-110 hover:font-bold'
                onClick={closeMenu}
              >
                Create Post
              </Link>
            </div>
            <div className='block mt-4 md:inline-block md:mt-0 md:mr-8'>
              <Link
                to='/profile'
                className='inline-block hover:scale-110 hover:font-bold'
                onClick={closeMenu}
              >
                {`${userInfo}`}
              </Link>
            </div>
            <div className='block mt-4 md:inline-block md:mt-0 md:mr-8'>
              <button
                to='/'
                className='inline-block hover:scale-110 hover:font-bold tracking-widest'
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className='mt-12 md:mt-0 text-center'>
            <div className='block mt-4 md:inline-block md:mt-0 md:mr-8'>
              <Link
                to='/login'
                className='inline-block hover:scale-110 hover:font-bold'
                onClick={closeMenu}
              >
                Login
              </Link>
            </div>
            <div className='block mt-4 md:inline-block md:mt-0 md:mr-8'>
              <Link
                to='/register'
                className='inline-block hover:scale-110 hover:font-bold'
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className='block md:hidden'>
        <MenuIcon isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
    </nav>
  );
};

export default Header;
