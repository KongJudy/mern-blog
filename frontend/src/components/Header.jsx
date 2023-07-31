import { useState } from 'react';
import { HiMenuAlt1, HiOutlineX } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

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
      <NavLink
        to={to}
        className='inline-block hover:scale-110 hover:font-bold'
        onClick={onClick}
      >
        {children}
      </NavLink>
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className='w-full fixed top-0 bg-wheat flex items-center justify-between flex-wrap p-6'>
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
              <NavItem to='/NewPost' onClick={closeMenu} children={'Post'} />
              <NavItem to='/Logout' onClick={closeMenu} children={'Logout'} />
            </>
          ) : (
            <>
              <NavItem to='/' onClick={closeMenu} children={'Home'} />
              <NavItem to='/Login' onClick={closeMenu} children={'Login'} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
