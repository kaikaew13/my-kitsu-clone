import React from 'react';

import '../../library/animelist-section/animelist-section.css';
import './each-anime-body.css';
import '../../library/follow/follow.css';

const URL = process.env.REACT_APP_URL;

const EachAnimeBody = (props) => (
  <div className="animelist-section">
    <div className="each-anime-pic">
      <img src={URL + '/images/aot.jpeg'} alt="" />
      <div className="each-anime-info">
        <p>Update Library</p>
        <div className="follow-btn smaller">Completed</div>
        <div className="follow-btn smaller blue">Want to Watch</div>
        <div className="follow-btn smaller purple">Started Watching</div>
      </div>
    </div>

    <div
      className="animelist-section-animelist"
      style={{ width: '60%', marginTop: '20px' }}
    >
      <h3>Title</h3>
      <p className="description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, ab?
        Quo cumque laborum culpa ut, dignissimos at suscipit omnis? Quibusdam
        ipsum suscipit voluptatum, excepturi vitae cum laboriosam tempore eaque
        sit dolor pariatur earum? Nesciunt alias, odit quis obcaecati rerum
        neque quibusdam, veniam adipisci praesentium incidunt quo temporibus
        nobis et, officiis iure aliquam dolorem atque? Rerum aut harum ab
        nesciunt laudantium odio sapiente amet incidunt obcaecati quidem,
        voluptatum iste ea consequuntur magnam ratione ipsa asperiores fugiat
        sit commodi quisquam! Ex modi recusandae laboriosam eos eligendi odit
        alias nulla temporibus reprehenderit fugiat aut, eaque esse dolore porro
        sit, quibusdam consectetur ad mollitia.
      </p>
    </div>
    <div
      className="status"
      style={{ height: '510px', justifyContent: 'flex-start' }}
    >
      <h5>Anime Details</h5>
      <ul className="anime-details-list">
        <li className="anime-details-list-items">
          <strong>English</strong>
          <p>Attack on Titan</p>
        </li>
        <li className="anime-details-list-items">
          <strong>Score</strong>
          <p>10</p>
        </li>
      </ul>
    </div>
  </div>
);

export default EachAnimeBody;
