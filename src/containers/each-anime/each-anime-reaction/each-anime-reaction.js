import React from 'react';

import '../../library/animelist-section/animelist-section.css';
import '../each-anime-body/each-anime-body.css';
import EachAnimePic from '../../../components/each-anime/each-anime-pic';
import EachAnimeReaction from '../../../components/each-anime/each-anime-reaction/each-anime-reaction';

const EachAnimeReactionContainer = (props) => (
  <div className="animelist-section">
    <EachAnimePic url={props.url} inLib={props.inLib} />
    <div
      className="fit-the-remaining"
      style={{ background: 'transparent', border: 'none' }}
    >
      <div style={{ width: '95%' }}>
        <EachAnimeReaction
          inLib={props.inLib}
          title={props.title}
          id={props.id}
        />
      </div>
    </div>
  </div>
);

export default EachAnimeReactionContainer;
