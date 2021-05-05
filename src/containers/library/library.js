import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import LibraryHeader from './library-header/library-header';
import AnimelistSection from './animelist-section/animelist-section';
import Follow from './follow/follow';

// const URL = process.env.REACT_APP_URL;

const Library = (props) => {
  // const [animelist, setAnimelist] = useState([]);
  const { match } = props;

  // useEffect(() => {
  //   if (!props.loading) {
  //     props.jwt &&
  //       (async () => {
  //         const res = await fetch(URL + '/user/get-animelist', {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: 'Bearer ' + props.jwt,
  //           },
  //         });
  //         if (res.status !== 200) throw new Error('failed to fetch animelist');
  //         const resData = await res.json();
  //         setAnimelist(
  //           resData.animelist.map((each) => ({
  //             id: each.animeId._id,
  //             url: URL + each.animeId.imageUrl,
  //           }))
  //         );
  //       })();
  //   }
  // }, [props.jwt, props.loading]);

  let library = null;
  if (!props.loading) {
    library = !props.jwt ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <Switch>
          <Route
            path={match.url + '/activity'}
            exact
            render={() => (
              <React.Fragment>
                <LibraryHeader
                  username={props.user.username}
                  linkName="Activity"
                />
              </React.Fragment>
            )}
          />
          <Route
            path={match.url + '/library'}
            exact
            render={() => {
              return (
                <React.Fragment>
                  <LibraryHeader
                    username={props.user.username}
                    linkName="Library"
                  />
                  <AnimelistSection />
                </React.Fragment>
              );
            }}
          />
          <Route
            path={match.url + '/reactions'}
            exact
            render={() => (
              <React.Fragment>
                <LibraryHeader
                  username={props.user.username}
                  linkName="Reactions"
                />
              </React.Fragment>
            )}
          />
          <Route
            path={match.url + '/followers'}
            exact
            render={() => (
              <React.Fragment>
                <LibraryHeader
                  username={props.user.username}
                  linkName="Followers"
                />
                <Follow userlist={props.user.followers} />
              </React.Fragment>
            )}
          />
          <Route
            path={match.url + '/following'}
            exact
            render={() => (
              <React.Fragment>
                <LibraryHeader
                  username={props.user.username}
                  linkName="Following"
                />
                <Follow userlist={props.user.following} />
              </React.Fragment>
            )}
          />
          <Route
            path={match.url + '/groups'}
            exact
            render={() => (
              <React.Fragment>
                <LibraryHeader
                  username={props.user.username}
                  linkName="Groups"
                />
              </React.Fragment>
            )}
          />
        </Switch>
        {/* <AnimelistSection /> */}
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
  };
};

export default connect(mapStateToProps)(Library);
