import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LibraryHeader from './library-header/library-header';
import AnimelistSection from './animelist-section/animelist-section';

const URL = process.env.REACT_APP_URL;

const Library = (props) => {
  const [animelist, setAnimelist] = useState([]);

  useEffect(() => {
    props.jwt &&
      (async () => {
        const res = await fetch(URL + '/user/get-animelist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + props.jwt,
          },
        });
        if (res.status !== 200) throw new Error('failed to fetch animelist');
        const resData = await res.json();
        setAnimelist(
          resData.animelist.map((each) => ({
            id: each.animeId._id,
            url: URL + each.animeId.imageUrl,
          }))
        );
      })();
  }, [props.jwt]);

  const library = !props.jwt ? (
    <Redirect to="/" />
  ) : (
    <React.Fragment>
      <LibraryHeader />
      <AnimelistSection />
    </React.Fragment>
  );

  return library;
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

export default connect(mapStateToProps)(Library);