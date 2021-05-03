const initialState = {
  jwt: null,
  jwtExpire: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_JWT':
      return {
        ...state,
        jwt: action.jwt,
        jwtExpire: action.expireTime,
      };
    case 'LOGOUT':
      localStorage.removeItem('jwt');
      localStorage.removeItem('jwt-expire-time');
      window.location.reload();
      return {
        ...state,
        jwt: null,
        jwtExpire: null,
      };
    default:
      return state;
  }
}
