import React from 'react';
import { connect } from 'react-redux';

import './section.css';
import EachSection from '../../../components/home/each-section/each-section';
import SearchBar from '../../../components/home/each-section/search-bar';

const AllAnime = (props) => {
  return (
    <React.Fragment>
      <SearchBar url={props.url}>{props.children}</SearchBar>
      <section>
        <div className="section-container">
          {props.animeData.map((each) => (
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
