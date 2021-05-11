import React from 'react';
import { useHistory } from 'react-router-dom';

import '../../../containers/library/animelist-section/animelist-section.css';

const AnimelistItem = (props) => {
  const history = useHistory();

  const redirectHandler = () => {
    history.push('/each-anime/' + props.id);
  };

  return (
    <div className="section-items">
      <img
        onClick={redirectHandler}
        className="section-items-img"
        src={props.url}
        alt={props.url}
      />
      <div className="progress">
        <p>{props.status}</p>
      </div>
    </div>
  );
};

export default AnimelistItem;
