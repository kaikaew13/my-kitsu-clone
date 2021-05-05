import React from 'react';

import '../../library/animelist-section/animelist-section.css';
import './each-anime-body.css';

const URL = process.env.REACT_APP_URL;

const EachAnimeBody = (props) => (
  <div className="animelist-section">
    <div className="each-anime-pic">
      <img src={URL + '/images/aot.jpeg'} alt="" />
    </div>
    <div className="each-anime-info">
      <span>Update Library</span>
    </div>
    <div
      className="animelist-section-animelist"
      style={{ width: '60%', marginTop: '20px' }}
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, ab?
      Quo cumque laborum culpa ut, dignissimos at suscipit omnis? Quibusdam
      ipsum suscipit voluptatum, excepturi vitae cum laboriosam tempore eaque
      sit dolor pariatur earum? Nesciunt alias, odit quis obcaecati rerum neque
      quibusdam, veniam adipisci praesentium incidunt quo temporibus nobis et,
      officiis iure aliquam dolorem atque? Rerum aut harum ab nesciunt
      laudantium odio sapiente amet incidunt obcaecati quidem, voluptatum iste
      ea consequuntur magnam ratione ipsa asperiores fugiat sit commodi
      quisquam! Ex modi recusandae laboriosam eos eligendi odit alias nulla
      temporibus reprehenderit fugiat aut, eaque esse dolore porro sit,
      quibusdam consectetur ad mollitia.
    </div>
    <div className="status" style={{ height: '510px' }}></div>
  </div>
);

export default EachAnimeBody;
