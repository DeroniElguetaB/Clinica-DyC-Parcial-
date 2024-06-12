import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import { AkarIconsSignOut } from './Icons/singoutLogo';
import { SolarUserRoundedBroken } from './Icons/userLogo'
import '../pages/Receta/receta.css'

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2 flex items-center header'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-teal-400 via-teal-550 to-teal-800 rounded-lg text-white'>
          DyC
        </span>
        <span className='p-1'>
          Coloproctología
        </span>
      </Link>
      {/* <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Buscar pacientes...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form> */}
      {/* <Button className='w-12 h-10 lg:hidden' pill>
        <AiOutlineSearch />
      </Button> */}
      <div className='flex gap-5 p-5 md:order-2 hover:border-0'>
        <Link
          className='w-12 h-12 hidden sm:inline bg-teal-500 rounded-full'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <svg className="hover:bg-teal-700 hover:rounded-full" color='white'xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="-17.5 -18 60 60"><path fill="currentColor" d="M11 5V1h2v4zm6.65 2.75l-1.375-1.375l2.8-2.875l1.4 1.425zM19 13v-2h4v2zm-8 10v-4h2v4zM6.35 7.7L3.5 4.925l1.425-1.4L7.75 6.35zm12.7 12.8l-2.775-2.875l1.35-1.35l2.85 2.75zM1 13v-2h4v2zm3.925 7.5l-1.4-1.425l2.8-2.8l.725.675l.725.7zM12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18"/></svg> : <svg className="hover:bg-teal-700 hover:rounded-full"  xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="-175 -180 600 600"><path fill="currentColor" d="M235.54 150.21a104.84 104.84 0 0 1-37 52.91A104 104 0 0 1 32 120a103.1 103.1 0 0 1 20.88-62.52a104.84 104.84 0 0 1 52.91-37a8 8 0 0 1 10 10a88.08 88.08 0 0 0 109.8 109.8a8 8 0 0 1 10 10Z"/></svg>}
        </Link>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' className='hover:bg-opacity-10 hover:text-teal-500' img={currentUser.profilePicture} rounded>Dr. {currentUser.username}</Avatar>
            }
          >
          <Link 
            to={'/dashboard?tab=profile'}>
            <Dropdown.Item
            icon={SolarUserRoundedBroken}
            className='text-teal-700'
            >
              Perfil
            </Dropdown.Item>
          </Link>
          <Dropdown.Item 
          onClick={handleSignout}
          className='cursor-pointer text-teal-700'
          icon={AkarIconsSignOut}
          >
            Cerrar sesion
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <>
          <Link className='flex ' to='/sign-in'>
            <Button className='bg-teal-500 dark:bg-teal-500' >
              Iniciar sesion
            </Button>
          </Link>
        </>
        )}
        {/* <Navbar.Toggle /> */}
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
