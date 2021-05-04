import React, { useState } from 'react';
import { connect } from 'react-redux';

import DropdownContent from '../../each-nav/dropdown-content/dropdown-content';
import Backdrop from '../../UI/backdrop';
import '../../../containers/home/section/section.css';
import '../../../containers/navigation/navigation.css';

const URL = process.env.REACT_APP_URL;

const EachSection = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownList = [
    'Completed',
    'On Hold',
    'Currently Watching',
    'Want to Watch',
    'Dropped',
  ];

  const dropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

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
    if (res.status !== 200) {
      console.log(res);
      throw new Error('failed to add to library');
    } else {
      await res.json();
      window.location.reload();
    }
  };
  let btnClass = 'lib-stat-drop';
  if (dropdown) btnClass += ' dropdown-content-show';
  return (
    <React.Fragment>
      {dropdown ? (
        <Backdrop class="backdrop" clicked={dropdownHandler} />
      ) : null}
      <div className="section-items">
        <img
          className="section-items-img"
          src={props.imageUrl}
          alt={props.imageUrl}
        />
        <div
          className="add-to-library dropdown"
          // onClick={() => addToLibrary(props.id, 'completed')}
        >
          <div className={btnClass} onClick={dropdownHandler}>
            {props.inLibrary ? props.inLibrary : 'Add To library'}
          </div>
          <div className="dropdown-content lib-stat-drop-content">
            {dropdownList.map((each, index) => {
              return (
                <DropdownContent
                  key={index}
                  clicked={() => addToLibrary(props.id, each)}
                >
                  {each}
                </DropdownContent>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    jwt: state.auth.jwt,
  };
};

export default connect(mapStateToProps)(EachSection);
