import React, { useState } from 'react';

import './signup-modal.css';

const URL = process.env.REACT_APP_URL;

const SignupModal = (props) => {
  const [username, setUsername] = useState({
    val: '',
    touched: false,
    validation: { minLength: 3, pass: false },
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    val: '',
    touched: false,
    validation: { minLength: 5, pass: false },
  });
  console.log(password.validation.pass);
  return (
    <form className="modal-signup">
      <div className="modal-signup-items">
        <h6>What should we call you?</h6>
        <p>Your username should be original, being witty is optional.</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username.val}
          onChange={(e) => {
            let pass = false;
            if (e.target.value.length >= username.validation.minLength)
              pass = true;
            setUsername((prevState) => ({
              ...prevState,
              touched: true,
              val: e.target.value,
              validation: { ...prevState.validation, pass: pass },
            }));
          }}
        />
      </div>
      <div className="modal-signup-items">
        <h6>What email should we use?</h6>
        <p>
          We'll use your email address to send you occasional updates and help
          you out if you forget your password.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="modal-signup-items">
        <h6>Think of a strong password.</h6>
        <p>
          Your password should be at least 5 characters. You should also
          consider mixing in numbers and special characters! This is to keep the
          bad guys from doing bad guy things with your account.
        </p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password.val}
          onChange={(e) => {
            let pass = false;
            if (e.target.value.length >= password.validation.minLength)
              pass = true;
            setPassword((prevState) => ({
              ...prevState,
              touched: true,
              val: e.target.value,
              validation: { ...prevState.validation, pass: pass },
            }));
          }}
        />
      </div>
      <button
        type="submit"
        className="modal-signup-submit"
        disabled={password.length < 5 || username.length < 3}
      >
        Let's get some basic info first
      </button>
    </form>
  );
};

export default SignupModal;
