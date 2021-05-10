import React, { useState } from 'react';
import { connect } from 'react-redux';

import './reaction-modal.css';

const URL = process.env.REACT_APP_URL;
const WORD_LIMIT = 140;

const ReactionModal = (props) => {
  const [reactionMessage, setReactionMessage] = useState(
    props.payload.reactionMessage ? props.payload.reactionMessage : ''
  );

  let btnClass = 'reaction-post-button';
  if (reactionMessage.length > 0 && reactionMessage.length <= WORD_LIMIT)
    btnClass += ' success';

  const onClickHandler = async (btnText) => {
    let endpoint = 'post-reaction';
    let method = 'POST';
    let body = {
      reactionMessage: reactionMessage,
      animeId: props.payload.id,
    };
    if (btnText === 'Edit') {
      endpoint = 'put-reaction';
      method = 'PUT';
      body = {
        reactionMessage: reactionMessage,
        reactionId: props.payload.id,
      };
    }

    const res = await fetch(URL + '/user/' + endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify(body),
    });
    if (method === 'POST' && res.status !== 201)
      throw new Error('failed to post a reaction');
    if (method === 'PUT' && res.status !== 200)
      throw new Error('failed to updat a reaction');
    const resData = await res.json();
    console.log(resData);
    props.closeModal();
  };

  let btnText = props.payload.reactionMessage ? 'Edit' : 'Post';

  return (
    <React.Fragment>
      <img className="reaction-img" src={URL + '/images/bg-modal.png'} alt="" />
      <div className="reaction-info">
        <div className="reaction-info-header">
          <span className="left">{props.payload.title}</span>
          <span className="left">TV</span>
          <span className="far-right">
            {WORD_LIMIT - reactionMessage.length}
          </span>
        </div>
        <textarea
          placeholder="While it may not be everyone's cup of tea, it's certainly interesting."
          value={reactionMessage}
          onChange={(e) => setReactionMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        className={btnClass}
        disabled={
          reactionMessage.length === 0 || reactionMessage.length > WORD_LIMIT
        }
        onClick={() => onClickHandler(btnText)}
      >
        {btnText}
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    payload: state.webGeneral.payload,
    jwt: state.auth.jwt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactionModal);
