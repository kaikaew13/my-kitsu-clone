import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DropdownContent from '../../each-nav/dropdown-content/dropdown-content';
import Backdrop from '../../UI/backdrop';
import '../../../containers/home/section/section.css';
import '../../../containers/navigation/navigation.css';

const URL = process.env.REACT_APP_URL;

const EachSection = (props) => {
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const dropdownList = [
    'Completed',
    'On Hold',
    'Currently Watching',
    'Want to Watch',
    'Dropped',
  ];
  if (props.role === 'admin') dropdownList.push('Edit');

  const dropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  const redirectHandler = () => {
    history.push('/each-anime/' + props.id);
  };

  const addToLibrary = async (animeId, status) => {
    if (!props.jwt) {
      props.toggleShowModal();
      return;
    }
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
          onClick={redirectHandler}
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
                  clicked={() =>
                    each !== 'Edit'
                      ? addToLibrary(props.id, each)
                      : history.push(`/admin?${each}=${props.id}`)
                  }
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
    role: state.user.user ? state.user.user.role : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: () =>
      dispatch({ type: 'OPEN_MODAL', which: 'login-modal' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EachSection);
