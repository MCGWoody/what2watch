import { produce } from 'immer';
import { FAILURE, SUCCESS } from '../constants';
import { SET_LOGIN_STATE } from './constants';

const initialState = {
  user: {
    isLoggedIn: false,
    uid: '',
    idToken: '',
  },
};

export default produce((draft, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      switch (action.status) {
        case SUCCESS:
          draft.user.isLoggedIn = action.payload?.isLoggedIn;
          draft.user.uid = action.payload.uid;
          draft.user.idToken = action.payload.idToken;
          break;
        case FAILURE:
          draft.user.isLoggedIn = action.payload?.isLoggedIn;
          draft.user.uid = action.payload.uid;
          draft.user.idToken = action.payload.idToken;
      }
      break;
    default:
  }
}, initialState);
