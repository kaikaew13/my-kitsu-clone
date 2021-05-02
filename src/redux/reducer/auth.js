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
    case 'RESET_JWT':
      console.log('reseting');
      return {
        ...state,
        jwt: null,
        jwtExpire: null,
      };
    default:
      return state;
  }
}
