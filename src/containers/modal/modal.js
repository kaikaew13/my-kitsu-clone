import React from 'react';
import { connect } from 'react-redux';

import AuthOptionModal from './auth-option-modal/auth-option-modal';
import SignupModal from './signup-modal/signup-modal';
import './modal.css';

const Modal = (props) => {
  const switchCaseHandler = () => {
    switch (props.modalType) {
      case 'auth-option-modal':
        return <AuthOptionModal />;
      case 'signup-modal':
        return <SignupModal />;
      default:
        return null;
    }
  };
  return <div className="modal">{switchCaseHandler()}</div>;
};

const mapStateToProps = (state) => {
  return {
    modalType: state.modalType,
  };
};

export default connect(mapStateToProps)(Modal);
