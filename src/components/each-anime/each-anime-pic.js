import React from 'react';
import { connect } from 'react-redux';

import '../../containers/each-anime/each-anime-summary/each-anime-summary.css';
import '../../containers/library/follow/follow.css';

const EachAnimePic = (props) => {
  console.log(props.inLib);
  let libraryBox = (
    <React.Fragment>
      <p>Add to Library</p>
      <div className="follow-btn smaller">Completed</div>
      <div className="follow-btn smaller blue">Want to Watch</div>
      <div className="follow-btn smaller purple">Started Watching</div>
    </React.Fragment>
  );
  if (props.inLib)
    libraryBox = (
      <React.Fragment>
        <p>Update Library</p>
        <div className="each-anime-info-status upper">
          <span>Saved in </span>
          <span className="link-edit-status">{props.inLib.status}</span>
        </div>
        <div className="follow-btn smaller blue">Add Rating</div>
        <div
          className="follow-btn smaller"
          onClick={() =>
            props.openReactionModal({
              title: props.title,
              id: props.id,
            })
          }
        >
          Post Reaction
        </div>
        <div className="each-anime-info-status">
          <span className="link-edit-status">Edit Library Entry</span>
        </div>
      </React.Fragment>
    );
  return (
    <div className="each-anime-pic">
      <img src={props.url} alt={props.url} />
      <div className="each-anime-info">{libraryBox}</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openReactionModal: (payload) =>
      dispatch({
        type: 'OPEN_MODAL',
        which: 'reaction-modal',
        payload: payload,
      }),
  };
};

export default connect(null, mapDispatchToProps)(EachAnimePic);
