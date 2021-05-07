import React from 'react';

import './reaction-modal.css';

const URL = process.env.REACT_APP_URL;

const ReactionModal = (props) => (
  <React.Fragment>
    <img className="reaction-img" src={URL + '/images/bg-modal.png'} alt="" />
    <div className="reaction-info">
      <div className="reaction-info-header">
        <span className="left">Kimetsu no Yaiba</span>
        <span className="left">TV</span>
        <span className="far-right">140</span>
      </div>
      <textarea placeholder="While it may not be everyone's cup of tea, it's certainly interesting."></textarea>
    </div>
    <button className="reaction-post-button success">Post</button>
  </React.Fragment>
);

export default ReactionModal;
