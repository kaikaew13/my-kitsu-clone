import React from 'react';
import { connect } from 'react-redux';

import AuthOptionModal from './auth-option-modal/auth-option-modal';
import SignupModal from './signup-modal/signup-modal';
import LoginModal from './login-modal/login-modal';
import ReactionModal from './reaction-modal/reaction-modal';
import './modal.css';

const Modal = (props) => {
  let className = 'modal';
  if (props.modalType === 'login-modal') className += ' login-modal-height';
  if (props.modalType === 'reaction-modal') className += ' reaction-modal';
  const switchCaseHandler = () => {
    switch (props.modalType) {
      case 'auth-option-modal':
        return <AuthOptionModal />;
      case 'signup-modal':
        return <SignupModal />;
      case 'login-modal':
        return <LoginModal />;
      case 'reaction-modal':
        return <ReactionModal />;
      default:
        return null;
    }
  };
  return <div className={className}>{switchCaseHandler()}</div>;
};

const mapStateToProps = (state) => {
  return {
    modalType: state.webGeneral.modalType,
  };
};

export default connect(mapStateToProps)(Modal);
