const initialState = {
  socket: null,
};

export default function socketReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SOCKET':
      return { ...state, socket: action.socket };
    default:
      return state;
  }
}
