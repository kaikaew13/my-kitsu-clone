import React from 'react';

const URL = process.env.REACT_APP_URL;

const AuthOptionModal = (props) => (
  <React.Fragment>
    <div
      className="modal-bg-img"
      style={{ background: `url(${URL + '/images/bg-modal.png'})` }}
    ></div>
    <div className="modal-auth-option">
      <p>
        Create an account to track, share and discover anime and manga in a
        uniquely social way.
      </p>
      <button className="facebook-btn"></button>
      <div className="modal-auth-option-a">
        <a href="/">Sign up with email</a>
        <p>
          Have an account? <a href="/">Login</a>
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

export default AuthOptionModal;
