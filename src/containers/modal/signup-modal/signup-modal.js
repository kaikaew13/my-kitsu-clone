import React from 'react';

import './signup-modal.css';

const URL = process.env.REACT_APP_URL;

const SignupModal = (props) => (
  <form class="modal-signup">
    <div class="modal-signup-items">
      <h6>What should we call you?</h6>
      <p>Your username should be original, being witty is optional.</p>

      <input type="text" name="username" placeholder="Username" />
    </div>
    <div class="modal-signup-items">
      <h6>What email should we use?</h6>
      <p>
        We'll use your email address to send you occasional updates and help you
        out if you forget your password.
      </p>

      <input type="text" name="email" placeholder="Email" />
    </div>
    <div class="modal-signup-items">
      <h6>Think of a strong password.</h6>
      <p>
        Your password should be at least 8 characters. You should also consider
        mixing in numbers and special characters! This is to keep the bad guys
        from doing bad guy things with your account.
      </p>

      <input type="password" name="password" placeholder="Password" />
    </div>
    <button type="submit" class="modal-signup-submit" disabled>
      Let's get some basic info first
    </button>
  </form>
);

export default SignupModal;
