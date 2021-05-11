import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Reaction from './reaction';
import './each-anime-reaction.css';

const EachAnimeReaction = (props) => {
  const history = useHistory();

  // const [reactionlist, setReactionlist] = useState([]);

  // const addReactionList = useCallback(
  //   (reaction) => {
  //     const newReaction = {
  //       userId: reaction.userId,
  //       username: 'socket',
  //       reactionMessage: reaction.reactionMessage,
  //       upvote: reaction.upvote,
  //       reactionId: reaction._id.toString(),
  //     };
  //     setReactionlist([...reactionlist, newReaction]);
  //   },
  //   [reactionlist]
  // );

  // useEffect(() => {
  //   props.socket.on('post-reaction', ({ reaction }) => {
  //     // const newReaction = {
  //     //   userId: reaction.userId,
  //     //   username: 'socket',
  //     //   reactionMessage: reaction.reactionMessage,
  //     //   upvote: reaction.upvote,
  //     //   reactionId: reaction._id.toString(),
  //     // };
  //     // setReactionlist([...reactionlist, newReaction]);
  //   });

  //   (async () => {
  //     const res = await fetch(URL + '/get-reaction/' + props.id, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (res.status !== 200) throw new Error('failed to fetch reactions');
  //     const resData = await res.json();
  //     // console.log(resData);
  //     setReactionlist(
  //       resData.reactions.map((each) => {
  //         return {
  //           userId: each.userId._id.toString(),
  //           username: each.userId.username,
  //           reactionMessage: each.reactionMessage,
  //           upvote: each.upvote,
  //           reactionId: each._id.toString(),
  //         };
  //       })
  //     );
  //   })();
  // }, [props.id, props.socket]);
  console.log(props.reactionlist);
  return props.reactionlist.length > 0 ? (
    <div className="reaction-container">
      <div className="reaction-header">
        <h5>Reactions</h5>
        {props.inLib && (
          <h5
            onClick={() =>
              props.openReactionModal({
                title: props.title,
                id: props.id.toString(),
              })
            }
            className="new-reaction"
          >
            New Reactions
          </h5>
        )}
      </div>
      <div className="reaction-content">
        {props.reactionlist.map(
          (each, index) =>
            (!props.viewmore || index <= 5) && (
              <Reaction
                otherUser={() =>
                  history.push(
                    '/others-library/' + each.userId._id + '/library'
                  )
                }
                clicked={() => history.push('/media-reaction/' + each._id)}
                key={each._id.toString()}
                id={each.userId._id}
                username={each.userId.username}
                reactionMessage={each.reactionMessage}
                upvote={each.upvote}
              />
            )
        )}
        {props.viewmore && (
          <div
            className="view-more-reaction"
            onClick={() =>
              history.push('/each-anime/' + props.id + '/reactions')
            }
          >
            View More Reactions
          </div>
        )}
      </div>
    </div>
  ) : props.reactionpage ? (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: '16px',
        marginTop: '16px',
      }}
    >
      This anime has no reactions
    </div>
  ) : null;
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

export default connect(null, mapDispatchToProps)(EachAnimeReaction);
