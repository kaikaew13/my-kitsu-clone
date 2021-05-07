import React from 'react';

import EachAnimePic from '../../../components/each-anime/each-anime-pic';
import EachAnimeDescription from '../../../components/each-anime/each-anime-description';
import EachAnimeDetails from '../../../components/each-anime/each-anime-details';
import '../../library/animelist-section/animelist-section.css';

const EachAnimeSummary = (props) => {
  return (
    <div className="animelist-section">
      <EachAnimePic url={props.url} id={props.id} title={props.title} />
      <div className="description-and-reaction-wrapper">
        <EachAnimeDescription
          title={props.title}
          description={props.description}
        />
      </div>

      <EachAnimeDetails
        title={props.title}
        score={props.score}
        genre={props.genre}
      />
    </div>
  );
};

export default EachAnimeSummary;
