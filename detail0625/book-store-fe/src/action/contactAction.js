import api from '../utils/api';
import * as types from '../constants/contact.constants';

// 카테고리 불러오기.
const createContact = (form) => async (dispatch) => {
  try {
    dispatch({ type: types.CONTACT_CREATE_REQUEST });
    const response = await api.post('/contact', form);
    dispatch({ type: types.CONTACT_CREATE_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.CONTACT_CREATE_FAIL, payload: err });
    console.error(err);
  }
};

export const contactActions = {
  createContact,
};
