import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EachSection from '../../../components/home/each-section/each-section';
import './section.css';

const Section = (props) => (
  <section>
    <h6>{props.children}</h6>
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
    <div className="section-view-more">
      <Link to={'/explore/all-anime/' + props.children}>view more</Link>
    </div>
  </section>
);

const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
  };
};

export default connect(mapStateToProps)(Section);
