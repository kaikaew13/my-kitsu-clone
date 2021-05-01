import React, { useState } from 'react';
import { connect } from 'react-redux';

import './login-modal.css';
import '../signup-modal/signup-modal.css';
import '../auth-option-modal/auth-option-modal.css';

const LoginModal = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let btnClassName = 'modal-signup-submit';
  if (email.length && password.length) btnClassName += ' success';

  return (
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/forgot-password">forgot password?</a>
          <button className={btnClassName}>Login</button>
        </form>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    switchToSignup: () =>
      dispatch({ type: 'OPEN_MODAL', which: 'signup-modal' }),
  };
};

export default connect(null, mapDispatchToProps)(LoginModal);
