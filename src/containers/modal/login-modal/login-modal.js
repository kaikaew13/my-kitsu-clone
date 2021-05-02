import React, { useState } from 'react';
import { connect } from 'react-redux';

import './login-modal.css';
import '../signup-modal/signup-modal.css';
import '../auth-option-modal/auth-option-modal.css';

const URL = process.env.REACT_APP_URL;

const LoginModal = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let btnClassName = 'modal-signup-submit';
  if (email.length && password.length) btnClassName += ' success';

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.status !== 200) throw new Error('failed to login');
    const data = await res.json();
    const expireTime = new Date().getTime() + 1000 * 10;
    localStorage.setItem('jwt', data.token);
    localStorage.setItem('jwt-expire-time', new Date(expireTime).toISOString());
    props.setJWT(data.token, expireTime);
    props.toggleModal();
  };

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
        <form className="modal-login-form" onSubmit={(e) => loginHandler(e)}>
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
    toggleModal: () => dispatch({ type: 'CLOSE_MODAL' }),
    setJWT: (jwt, expireTime) =>
      dispatch({ type: 'SET_JWT', jwt: jwt, expireTime: expireTime }),
  };
};

export default connect(null, mapDispatchToProps)(LoginModal);
