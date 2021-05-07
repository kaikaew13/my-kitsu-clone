import React from 'react';
import { connect } from 'react-redux';

import '../../containers/each-anime/each-anime-summary/each-anime-summary.css';
import '../../containers/library/follow/follow.css';

const EachAnimePic = (props) => {
  let libraryBox = (
    <React.Fragment>
      <p>Add to Library</p>
      <div className="follow-btn smaller">Completed</div>
      <div className="follow-btn smaller blue">Want to Watch</div>
      <div className="follow-btn smaller purple">Started Watching</div>
    </React.Fragment>
  );
  if (!props.loading) {
    if (props.animelist && props.animelist[props.id])
      libraryBox = (
        <React.Fragment>
          <p>Update Library</p>
          <div className="each-anime-info-status upper">
            <span>Saved in </span>
            <span className="link-edit-status">
              {props.animelist[props.id].status}
            </span>
          </div>
          <div className="follow-btn smaller blue">Add Rating</div>
          <div className="follow-btn smaller">Post Reaction</div>
          <div className="each-anime-info-status">
            <span className="link-edit-status">Edit Library Entry</span>
          </div>
        </React.Fragment>
      );
  }
  return props.loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="each-anime-pic">
      <img src={props.url} alt={props.url} />
      <div className="each-anime-info">{libraryBox}</div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
    loading: state.webGeneral.loading,
  };
};

export default connect(mapStateToProps)(EachAnimePic);
