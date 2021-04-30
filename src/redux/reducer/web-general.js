const initialState = {
  showModal: false,
};

export default function webGeneralReducer(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, showModal: true };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false };
    default:
      return state;
  }
}
