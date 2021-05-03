import React from 'react';
import { connect } from 'react-redux';

import '../../containers/home/section/section.css';

const URL = process.env.REACT_APP_URL;

const EachSection = (props) => {
  const addToLibrary = async (animeId, status) => {
    const res = await fetch(URL + '/user/add-to-library', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.jwt,
      },
      body: JSON.stringify({
        animeId: animeId,
        status: status,
      }),
    });
    if (res.status !== 200) throw new Error('failed to add to library');
    const resData = await res.json();
    alert(resData.message);
  };
  return (
    <div className="section-items">
      <img
        className="section-items-img"
        src={props.imageUrl}
        alt={props.imageUrl}
      />
      <div
        className="add-to-library"
        onClick={() => addToLibrary(props.id, 'completed')}
      >
        Add To library
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

export default connect(mapStateToProps)(EachSection);
