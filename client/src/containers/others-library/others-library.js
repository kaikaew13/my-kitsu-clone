import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import LibraryHeader from '../library/library-header/library-header';
import AnimelistSection from '../library/animelist-section/animelist-section';
import Follow from '../library/follow/follow';
import Error404 from '../../components/UI/404';
import UserReaction from '../library/user-reaction/user-reaction';

const URL = process.env.REACT_APP_URL;

const OthersLibrary = (props) => {
  const [otherUser, setOtherUser] = useState(null);
  const [otherAnimelist, setOtherAnimelist] = useState(null);
  const [loading, setLoading] = useState(true);
  const navList = [
    'activity',
    'library',
    'reactions',
    'followers',
    'following',
    'groups',
  ];

  const { match, setNav } = props;
  const PATH = 'others-library/' + match.params.otherUserId;

  useEffect(() => {
    setNav(PATH);
    (async () => {
      const res = await fetch(
        URL + '/get-other-user/' + match.params.otherUserId
      );
      if (res.status !== 200) {
        // throw new Error('failed to fetch this user library');
        alert('failed to fetch this user library');
        window.location.replace('/');
        return;
      }
      const resData = await res.json();
      const user = resData.user;
      setOtherUser({
        id: user._id,
        username: user.username,
        followers: user.followers,
        following: user.following,
        role: user.role,
        reactionlist: user.reactionlist,
      });
      const animelist = {};
      user.animelist.forEach((each) => {
        if (each.animeId) animelist[each.animeId._id.toString()] = each;
      });
      setOtherAnimelist(animelist);
      setLoading(false);
    })();
  }, [match.params.otherUserId, setNav, PATH]);

  let library = null;
  let user = null;
  let animelist = null;
  if (!loading) {
    user = otherUser;
    animelist = otherAnimelist;
  }

  if (!props.loading) {
    library = (
      <React.Fragment>
        <Switch>
          {navList.map((each, index) => {
            return (
              <Route
                key={index}
                path={match.url + '/' + each}
                exact
                render={() => {
                  return (
                    <React.Fragment>
                      <LibraryHeader
                        path={PATH}
                        username={user.username}
                        linkName={each.charAt(0).toUpperCase() + each.slice(1)}
                      />
                      {each === 'library' ? (
                        <AnimelistSection
                          username={user.username}
                          animelist={Object.values(animelist)}
                        />
                      ) : each === 'followers' || each === 'following' ? (
                        <Follow
                          user={user}
                          curUser={props.curUser}
                          other={true}
                          page={each}
                        />
                      ) : each === 'reactions' ? (
                        <UserReaction user={user} animelist={animelist} />
                      ) : null}
                    </React.Fragment>
                  );
                }}
              />
            );
          })}
          <Route component={Error404} />
        </Switch>
      </React.Fragment>
    );
  }

  return loading || props.curLoading ? <h1>Loading...</h1> : library;
};

const mapStateToProps = (state) => {
  return {
    curUser: state.user.user,
    curLoading: state.webGeneral.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OthersLibrary);
