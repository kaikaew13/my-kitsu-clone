const initialState = {
  showModal: false,
  modalType: null,
  loading: true,
  payload: null,
  transparentNav: false,
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
    case 'SET_NAV':
      return {
        ...state,
        transparentNav:
          action.path !== 'explore' &&
          action.path !== 'media-reaction' &&
          action.path !== 'admin',
      };
    default:
      return state;
  }
}
