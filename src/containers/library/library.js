import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import LibraryHeader from './library-header/library-header';
import AnimelistSection from './animelist-section/animelist-section';

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
  console.log(match);
  if (!props.loading) {
    library = !props.jwt ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <Switch>
          <Route
            path={match.url + '/library'}
            exact
            // component={AnimelistSection}
            render={() => {
              return (
                <React.Fragment>
                  <LibraryHeader linkName="Library" />
                  <AnimelistSection />
                </React.Fragment>
              );
            }}
          />
          <Route
            path={match.url + '/aww'}
            exact
            render={() => (
              <div
                className="lol"
                style={{
                  width: '100px',
                  height: '100px',
                  border: '1px solid black',
                }}
              ></div>
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
    jwt: state.auth.jwt,
    loading: state.webGeneral.loading,
  };
};

export default connect(mapStateToProps)(Library);
