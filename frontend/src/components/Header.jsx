import { useState } from 'react';
import { HiMenuAlt1, HiOutlineX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const MenuIcon = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className='flex items-center px-3 py-2'>
      <HiMenuAlt1 size={20} className={`${isOpen ? 'hidden' : 'block'}`} />
      <HiOutlineX size={20} className={`${isOpen ? 'block' : 'hidden'}`} />
    </button>
  );
};

const NavItem = ({ to, children, onClick }) => {
  return (
    <div className='block mt-4 md:inline-block md:mt-0 md:mr-8'>
      <Link
        to={to}
        className='inline-block hover:scale-110 hover:font-bold'
        onClick={onClick}
      >
        {children}
      </Link>
    </div>
  );
};

const Header = ({ loggedIn, setLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className='w-full fixed z-50 top-0 bg-wheat flex items-center justify-between flex-wrap p-6 lg:px-40'>
      <div className='flex md:text-center justify-center flex-shrink-0'>
        <span className='font-playfair font-bold text-2xl'>Blogger</span>
      </div>
      <div className='block md:hidden'>
        <MenuIcon isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
      <div
        className={`w-full block md:flex md:items-center md:w-auto ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className='text-md text-center md:flex-grow flex-row justify-end'>
          {loggedIn ? (
            <>
              <NavItem to='/' onClick={closeMenu} children={'Home'} />
              <NavItem
                to='/create'
                onClick={closeMenu}
                children={'Create new post'}
              />
              <NavItem to='/logout' onClick={closeMenu} children={'Logout'} />
            </>
          ) : (
            <>
              <NavItem to='/' onClick={closeMenu} children={'Home'} />
              <NavItem to='/login' onClick={closeMenu} children={'Login'} />
              <NavItem
                to='/register'
                onClick={closeMenu}
                children={'Register'}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
