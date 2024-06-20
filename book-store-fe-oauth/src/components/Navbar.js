import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchBook from './SearchBook';
import { isFunctionLikeExpression } from 'eslint-plugin-react/lib/util/ast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userActions';
const drawerWidth = 240;
const logIn = '로그인';
const logOut = '로그아웃';
const register = '회원가입';
const cart = '장바구니';

function NavBar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate('/');
  };
  console.log('Navbar', user);
  return (
    <div>
      {/*<CssBaseline />*/}
      <AppBar
        position="static"
        sx={{ top: 0, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <h2 style={{ color: 'black' }}>로고 이미지</h2>
        </Box>
        <Box>
          <SearchBook />
        </Box>
        <Box>
          <Toolbar>
            <Box>
              {!user ? (
                <Button key={logIn} sx={{ color: 'black' }}>
                  <div
                    onClick={() => {
                      console.log('loginin!');
                      navigate('/login');
                    }}>
                    {logIn}
                  </div>
                </Button>
              ) : (
                <Button key={logOut} sx={{ color: 'black' }}>
                  <div onClick={handleLogout}>{logOut}</div>
                </Button>
              )}
            </Box>
            <Box>
              <Button key={register} sx={{ color: 'black' }}>
                <div
                  onClick={() => {
                    console.log('register!');
                    navigate('/register');
                  }}>
                  {register}
                </div>
              </Button>
            </Box>
            <Box>
              <Button key={cart} sx={{ color: 'black' }}>
                {cart}
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
}

export default NavBar;
