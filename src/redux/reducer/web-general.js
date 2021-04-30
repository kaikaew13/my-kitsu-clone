const initialState = {
  showModal: false,
};

export default function webGeneralReducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, showModal: true };
    default:
      return state;
  }
}
