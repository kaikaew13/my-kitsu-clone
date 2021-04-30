import React from 'react';

const EachSection = (props) => (
  <div className="section-items">
    <img
      className="section-items-img"
      src={props.imageUrl}
      alt={props.imageUrl}
    />
  </div>
);

export default EachSection;
