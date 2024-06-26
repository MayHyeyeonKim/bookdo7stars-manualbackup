import * as types from '../constants/contact.constants';
const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

function contactReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CONTACT_CREATE_REQUEST:
      return { ...state, loading: true };
    case types.CONTACT_CREATE_SUCCESS:
      return { ...state, contacts: [], error: payload };
    case types.CONTACT_CREATE_FAIL:
      return { ...state, loading: false, contacts: [], error: payload };

    default:
      return state;
  }
}

export default contactReducer;
