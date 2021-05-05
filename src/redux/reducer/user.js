const initialState = {
  user: null,
  animelist: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'SET_ANIMELIST':
      return { ...state, animelist: action.animelist };
    case 'UNSET_USER':
      return { ...state, user: null, animelist: null };
    default:
      return state;
  }
}
