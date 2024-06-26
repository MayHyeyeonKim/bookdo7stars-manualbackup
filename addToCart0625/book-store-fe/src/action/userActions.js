import axios from 'axios';
import * as types from '../constants/user.constants';
import { commonUiActions } from './commonUiAction';
import api from '../utils/api';

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get('/user/me', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    });
    if (response.status !== 200) throw new Error(response.data.message);
    dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: error });
    dispatch(logout());
  }
};

const loginWithEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGIN_REQUEST });
    const response = await api.post('/auth/login', payload);
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('로그인을 성공하셨습니다!', 'success'));
    sessionStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch({ type: types.USER_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post('/auth/google', { token });
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    sessionStorage.setItem('token', response.data.token);
    dispatch(commonUiActions.showToastMessage('Google login successful!', 'success'));
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const loginWithKakao = (code, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });
    const response = await api.get('/auth/kakao', { params: { code } });
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
    sessionStorage.setItem('token', response.data.token);
    dispatch(loginWithToken());
    navigate('/');
    dispatch(commonUiActions.showToastMessage('Kakao login successful!', 'success'));
  } catch (error) {
    dispatch({ type: types.KAKAO_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const loginWithGithub = (code, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.GITHUB_LOGIN_REQUEST });
    const response = await api.get('/auth/github', { params: { code } });
    dispatch({ type: types.GITHUB_LOGIN_SUCCESS, payload: response.data });
    sessionStorage.setItem('token', response.data.token);
    dispatch(loginWithToken());
    navigate('/');
    dispatch(commonUiActions.showToastMessage('GitHub login successful!', 'success'));
  } catch (error) {
    dispatch({ type: types.GITHUB_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const registerUser =
  ({ email, userName, password, role, level, address, phone }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post('/user', { email, userName, password, role, level, address, phone });
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: response.data });
      dispatch(commonUiActions.showToastMessage('Registration completed successfully.', 'success'));
      navigate('/login');
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.message });
    }
  };

// 어드민 대쉬보드에서 어드민 계정 생성
const registerAdmin =
  ({ email, userName, password, role }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const Response = await api.post('/user', { email, userName, password, role });
      if (Response.status !== 200) throw new Error(Response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: Response.data });
      dispatch(commonUiActions.showToastMessage('Registration completed successfully.', 'success'));
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
    }
  };

// 로그아웃.
const logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGOUT });
    sessionStorage.removeItem('token');
  } catch (error) {}
};

// 회원 탈퇴.
const removeUser = () => async (dispatch) => {};

// 어드민 대쉬보드에서 관리자를 get 해서 보여주기
const adminUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ADMIN_REQUEST });
    const response = await api.get('/user/admin');
    if (response.status !== 200) throw new Error(response.data.message);
    dispatch({ type: types.GET_ADMIN_SUCCESS, payload: response.data.users });
    dispatch(getAllUser());
  } catch (error) {
    dispatch({ type: types.GET_ADMIN_FAIL });
  }
};

// 어드민 대쉬보드에서 모든 유저를 get 해서 보여주기
const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_All_USERS_REQUEST });
    const response = await api.get('/user/all');
    if (response.status !== 200) throw new Error(response.data.message);
    dispatch({ type: types.GET_All_USERS_SUCCESS, payload: response.data.users });
  } catch (error) {
    dispatch({ type: types.GET_All_USERS_FAIL });
  }
};

const updateUserLevel = (id, level) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LEVEL_EDIT_REQUEST });

    const response = await api.put(`/user/${id}`, { level }); // PUT 요청으로 변경

    if (response.status !== 200) throw new Error(response.data.message);

    dispatch({ type: types.USER_LEVEL_EDIT_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: types.USER_LEVEL_EDIT_FAIL, payload: error.message });
  }
};

export const userActions = {
  loginWithToken,
  loginWithEmail,
  loginWithGoogle,
  loginWithKakao,
  loginWithGithub,
  registerUser,
  logout,
  removeUser,
  adminUser,
  registerAdmin,
  getAllUser,
  updateUserLevel,
};
