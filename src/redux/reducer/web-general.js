const initialState = {
  showModal: false,
  modalType: null,
};

export default function webGeneralReducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, showModal: true, modalType: action.which };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false, modalType: null };
    default:
      return state;
  }
}
