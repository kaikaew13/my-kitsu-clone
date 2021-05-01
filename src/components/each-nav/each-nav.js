import React, { useState } from 'react';

import DropdownContent from './dropdown-content/dropdown-content';
import Backdrop from '../UI/backdrop';
import '../../containers/navigation/navigation.css';

const URL = process.env.REACT_APP_URL;

const EachNav = (props) => {
  const [dropdown, setDropdown] = useState(false);

  const dropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  if (props.children === 'logo')
    return (
      <div className="nav-a">
        <img
          className={props.children}
          src={URL + '/images/logo.png'}
          alt="/images/logo.png"
        />
      </div>
    );

  let btnClass = 'drop-btn';
  if (dropdown) btnClass += ' dropdown-content-show';

  return props.dropdown ? (
    <React.Fragment>
      {dropdown ? (
        <Backdrop class="backdrop" clicked={dropdownHandler} />
      ) : null}

      <div className="nav-a dropdown">
        <button
          onClick={dropdownHandler}
          className={btnClass}
          id="drop-btn-browse"
        >
          {props.children}
        </button>
        <div className="dropdown-content">
          {props.dropdownList.map((each, index) => {
            return (
              <DropdownContent key={index} href={each.to}>
                {each.name}
              </DropdownContent>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <div className="nav-a" onClick={props.clicked}>
      <button className={btnClass}>{props.children}</button>
    </div>
  );
};

export default EachNav;
