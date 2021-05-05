import React from 'react';

import '../../library/animelist-section/animelist-section.css';
import './each-anime-body.css';
import EachAnimePic from '../../../components/each-anime/each-anime-pic';

const EachAnimeBody = (props) => (
  <div className="animelist-section">
    <EachAnimePic url={props.url} />
    <div className="fit-the-remaining"></div>
  </div>
);

export default EachAnimeBody;
