import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

import { singOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrownLogo className='logo' />
        </Link>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>

          {currentUser ? (
            <span className='nav-link' onClick={singOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
