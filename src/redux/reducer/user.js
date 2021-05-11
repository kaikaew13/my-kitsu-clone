const initialState = {
  user: null,
  animelist: null,
  upvotedlist: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user };
    case 'SET_ANIMELIST':
      return { ...state, animelist: action.animelist };
    case 'UNSET_USER':
      return { ...state, user: null, animelist: null };
    case 'SET_UPVOTEDLIST':
      return { ...state, upvotedlist: action.upvotedlist };
    default:
      return state;
  }
}
