import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './section.css';
import EachSection from '../../../components/home/each-section/each-section';
import SearchBar from '../../../components/home/each-section/search-bar';

const URL = process.env.REACT_APP_URL;

const AllAnime = (props) => {
  const [animeArr, setAnimeArr] = useState([]);

  useEffect(() => {
    fetch(URL + '/get-home/no-limit/all', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          // throw new Error('failed fetch home page');
          alert('failed to fetch from server please try again later...');
          return;
        }
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
        setAnimeArr(
          resData.animeList.map((each) => ({
            url: URL + each.imageUrl,
            id: each._id,
          }))
        );
      })
      .catch((err) => alert('failed to load please try again later'));
  }, []);

  return (
    <React.Fragment>
      <SearchBar url={props.url}>{props.children}</SearchBar>
      <section>
        <div className="section-container">
          {animeArr.map((each) => (
            <EachSection
              key={each.id}
              id={each.id}
              inLibrary={
                props.animelist !== null && props.animelist[each.id]
                  ? props.animelist[each.id].status
                  : false
              }
              imageUrl={each.url}
            />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
  };
};

export default connect(mapStateToProps)(AllAnime);
