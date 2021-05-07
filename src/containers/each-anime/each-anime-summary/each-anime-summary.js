import React from 'react';

import EachAnimePic from '../../../components/each-anime/each-anime-pic';
import EachAnimeDescription from '../../../components/each-anime/each-anime-description';
import EachAnimeDetails from '../../../components/each-anime/each-anime-details';
import EachAnimeReaction from '../../../components/each-anime/each-anime-reaction/each-anime-reaction';
import '../../library/animelist-section/animelist-section.css';

const EachAnimeSummary = (props) => {
  return (
    <div className="animelist-section">
      <EachAnimePic
        url={props.url}
        id={props.id}
        title={props.title}
        inLib={props.inLib}
      />
      <div className="description-and-reaction-wrapper">
        <EachAnimeDescription
          title={props.title}
          description={props.description}
        />
        <EachAnimeReaction />
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
