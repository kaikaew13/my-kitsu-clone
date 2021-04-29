import React, { useState } from 'react';

//dropdown, dropdownList, buttonClass

const EachNav = (props) => {
  const [dropdown, setDropdown] = useState(false);

  let btnClass = 'drop-btn';
  if (dropdown) btnClass += ' dropdown-content-show';

  return props.dropdown ? (
    <div className="nav-a dropdown">
      <button
        onClick={() => setDropdown((prevState) => !prevState)}
        className={btnClass}
        id="drop-btn-browse"
      >
        {props.children}
      </button>
      <div className="dropdown-content">
        <a href="/" className="dropdown-content-items">
          anime
        </a>
        <a href="/" className="dropdown-content-items">
          manga
        </a>
      </div>
    </div>
  ) : (
    <div className="nav-a">
      <button onClick className={btnClass}>
        {props.children}
      </button>
    </div>
  );
};

export default EachNav;
