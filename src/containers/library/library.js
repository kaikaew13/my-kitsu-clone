import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import LibraryHeader from './library-header/library-header';
import AnimelistSection from './animelist-section/animelist-section';
import Follow from './follow/follow';
import Error404 from '../../components/UI/404';
import UserReaction from './user-reaction/user-reaction';

// const URL = process.env.REACT_APP_URL;

const Library = (props) => {
  const { match } = props;

  const navList = [
    'activity',
    'library',
    'reactions',
    'followers',
    'following',
    'groups',
  ];

  let library = null;
  if (!props.loading) {
    library = !props.jwt ? (
      <Redirect to="/" />
    ) : (
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
                        username={props.user.username}
                        linkName={each.charAt(0).toUpperCase() + each.slice(1)}
                      />
                      {each === 'library' ? (
                        <AnimelistSection />
                      ) : each === 'followers' || each === 'following' ? (
                        <Follow user={props.user} page={each} />
                      ) : each === 'reactions' ? (
                        <UserReaction
                          user={props.user}
                          animelist={props.animelist}
                        />
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

  return props.loading ? <h1>Loading...</h1> : library;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    jwt: state.auth.jwt,
    loading: state.webGeneral.loading,
    animelist: state.user.animelist,
  };
};

export default connect(mapStateToProps)(Library);
