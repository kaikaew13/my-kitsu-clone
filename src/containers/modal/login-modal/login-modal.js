import React from 'react';
import { connect } from 'react-redux';

import './login-modal.css';
import '../signup-modal/signup-modal.css';
import '../auth-option-modal/auth-option-modal.css';

const LoginModal = (props) => (
  <div className="modal-signup">
    <div className="modal-signup-items">
      <h6>Welcome back!</h6>
      <p>
        Login to your Kitsu account below. If you need an account,{' '}
        <span className="clickable-p" onClick={props.switchToSignup}>
          create one
        </span>
        .
      </p>
    </div>
    <div className="modal-login-option">
      <div className="modal-login-facebook">
        <button>Continue with Facebook</button>
      </div>
      <p>Or, sign in with:</p>
      <form className="modal-login-form">
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <a href="/forgot-password">forgot password?</a>
        <button className="modal-signup-submit">Login</button>
      </form>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    switchToSignup: () =>
      dispatch({ type: 'OPEN_MODAL', which: 'signup-modal' }),
  };
};

export default connect(null, mapDispatchToProps)(LoginModal);
