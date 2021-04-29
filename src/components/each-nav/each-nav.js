import React, { useState } from 'react';

import DropdownContent from './dropdown-content/dropdown-content';
import Backdrop from '../UI/backdrop';

//dropdown, dropdownList, buttonClass

const EachNav = (props) => {
  const [dropdown, setDropdown] = useState(false);

  const dropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };

  let btnClass = 'drop-btn';
  if (dropdown) btnClass += ' dropdown-content-show';

  return props.dropdown ? (
    <React.Fragment>
      {dropdown ? <Backdrop clicked={dropdownHandler} /> : null}

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
    <div className="nav-a">
      <button className={btnClass}>{props.children}</button>
    </div>
  );
};

export default EachNav;
