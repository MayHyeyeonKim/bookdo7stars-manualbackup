import Box from '@mui/material/Box';
import { bookActions } from '../../action/bookActions';
import { categoryActions } from '../../action/categoryActions';
import SearchBook from '../SearchBook';
import { IconButton, Menu, useMediaQuery, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { userActions } from '../../action/userActions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const logIn = '로그인';
const logOut = '로그아웃';
const register = '회원가입';
const cart = '장바구니';

const NavToolbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cartItemCount } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate('/');
  };

  const [query] = useSearchParams();
  const fields = ['total', 'isbn', 'title', 'author', 'category', 'publisher'];

  const totalField = fields.reduce((total, item) => {
    total[item] = query.get(item) || '';
    return total;
  }, {});

  const [searchQuery, setSearchQuery] = useState(totalField);

  const goToMyPage = () => {
    navigate('/account/myinfo');
  };

  const goToAdminPage = () => {
    navigate('/admin/dashboard');
  };

  const handleSearch = (newSearchQuery) => {
    const params = new URLSearchParams();
    Object.keys(newSearchQuery).forEach((key) => {
      const value = newSearchQuery[key];
      if (value !== undefined && value !== '') {
        params.append(key, value);
      }
    });
    const query = params.toString();
    navigate('?' + query);
    dispatch(bookActions.getBookList(newSearchQuery));
  };

  const resetSearch = () => {
    setSearchQuery({});
  };

  const renderButtons = () => (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
      {!user ? (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            color: 'primary',
            fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
            width: isMobile ? '80px' : isTablet ? '90px' : '100px',
          }}
          onClick={() => navigate('/login')}>
          {logIn}
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            color: 'primary',
            fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
            width: isMobile ? '80px' : isTablet ? '90px' : '100px',
          }}
          onClick={handleLogout}>
          {logOut}
        </Button>
      )}
      {!user && (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            color: 'primary',
            fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
            width: isMobile ? '80px' : isTablet ? '90px' : '100px',
          }}
          onClick={() => navigate('/register')}>
          {register}
        </Button>
      )}
      {user && user.role === 'customer' && (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            color: 'primary',
            fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
            width: isMobile ? '80px' : isTablet ? '90px' : '100px',
          }}
          onClick={goToMyPage}>
          마이페이지
        </Button>
      )}
      <Button
        variant="outlined"
        size="medium"
        sx={{
          color: 'primary',
          fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
          width: isMobile ? '80px' : isTablet ? '90px' : '100px',
        }}
        onClick={() => navigate('/cart')}>
        {cart} ({cartItemCount || 0})
      </Button>
      {user && user.role === 'admin' && (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            color: 'primary',
            fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
            width: isMobile ? '80px' : isTablet ? '90px' : '100px',
          }}
          onClick={goToAdminPage}>
          관리자
        </Button>
      )}
    </Box>
  );

  const renderMobileMenu = (popupState) => (
    <Menu
      {...bindMenu(popupState)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      ModalProps={{
        disableScrollLock: true,
      }}
      sx={{
        position: 'absolute',
      }}>
      {user ? (
        <>
          <MenuItem
            onClick={() => {
              popupState.close();
              navigate('/account/myinfo');
            }}>
            마이페이지
          </MenuItem>
          <MenuItem
            onClick={() => {
              popupState.close();
              handleLogout();
            }}>
            {logOut}
          </MenuItem>
          {user.role === 'admin' && (
            <MenuItem
              onClick={() => {
                popupState.close();
                navigate('/admin/dashboard');
              }}>
              관리자
            </MenuItem>
          )}
        </>
      ) : (
        <>
          <MenuItem
            onClick={() => {
              popupState.close();
              navigate('/login');
            }}>
            {logIn}
          </MenuItem>
          <MenuItem
            onClick={() => {
              popupState.close();
              navigate('/register');
            }}>
            {register}
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flex: '0 1 auto',
      }}>
      <Box
        onClick={() => {
          navigate('/');
          dispatch(bookActions.getBookList({}));
          dispatch(categoryActions.setSelectedCategory(null));
        }}
        sx={{ cursor: 'pointer', padding: 1 }}>
        <img src="/logo.png" alt="로고 이미지" style={{ color: '#d3ddbd', borderRadius: '3px', height: isMobile ? '4rem' : isTablet ? '5rem' : '7rem' }} />
      </Box>
      <Box sx={{ flex: isMobile ? '1 1 100%' : isTablet ? '1 1 80%' : '1 1 auto', width: '100%', marginY: isMobile ? 2 : isTablet ? 1 : 0 }}>
        <SearchBook
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          fields={fields}
          resetSearch={resetSearch}
          handleSearch={handleSearch}
          isMobile={isMobile}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isMobile || isTablet ? (
          <PopupState variant="popover" popupId="mobile-menu">
            {(popupState) => (
              <>
                <IconButton color="primary" {...bindTrigger(popupState)}>
                  <PersonIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => navigate('/cart')}>
                  <ShoppingCartIcon />
                </IconButton>
                {renderMobileMenu(popupState)}
              </>
            )}
          </PopupState>
        ) : (
          renderButtons()
        )}
      </Box>
    </Toolbar>
  );
};

export default NavToolbar;
