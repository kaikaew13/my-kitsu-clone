import React from 'react';
import { connect } from 'react-redux';

import './auth-option-modal.css';

const URL = process.env.REACT_APP_URL;

const AuthOptionModal = (props) => (
  <React.Fragment>
    <div
      className="modal-bg-img"
      style={{
        background: `url(${URL + '/images/bg-modal.png'})`,
      }}
    ></div>
    <div className="modal-auth-option">
      <p>
        Create an account to track, share and discover anime and manga in a
        uniquely social way.
      </p>
      <div className="facebook-btn">
        <button>Continue with Facebook</button>
      </div>

      <div className="modal-auth-option-a">
        <div
          onClick={() => props.switchToSignup('signup-modal')}
          className="clickable-p"
        >
          Sign up with email
        </div>
        <p>
          Have an account?{' '}
          <span
            className="clickable-p"
            onClick={() => props.switchToSignup('login-modal')}
          >
            Login
          </span>
        </p>
      </div>
      <div className="small-text">
        <p>
          If you sign up with Facebook, we’ll start you off with a network by
          automatically matching you with your followers/followees or friends
          already on Kitsu. Don't worry, we’ll never post to Facebook without
          your permission.
        </p>
        <p>
          By signing up you indicate that you have read and agree to the
          <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </React.Fragment>
);

const mapDispatchToProps = (dispatch) => {
  return {
    switchToSignup: (modalType) =>
      dispatch({ type: 'OPEN_MODAL', which: modalType }),
  };
};

export default connect(null, mapDispatchToProps)(AuthOptionModal);
