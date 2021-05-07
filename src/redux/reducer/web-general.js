const initialState = {
  showModal: false,
  modalType: null,
  loading: true,
  payload: null,
};

export default function webGeneralReducer(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        showModal: true,
        modalType: action.which,
        payload: action.payload,
      };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false, modalType: null };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'UNSET_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
}
