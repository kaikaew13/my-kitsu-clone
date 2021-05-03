import React from 'react';

import '../../../containers/home/section/section.css';

const SearchBar = (props) => (
  <section>
    <h3>{props.children}</h3>
    <div className="search-bar-wrapper">
      <img
        src={props.url + '/images/icons8-search-50.png'}
        alt="/images/icons8-search-50.png"
      />
      <div className="section-main-search-bar">
        <input type="text" placeholder="What are you searching for?" />
      </div>
    </div>
    <div className="section-advanced-search">
      <p>
        Or, browse with the <a href="/">advanced search</a>
      </p>
    </div>
  </section>
);

export default SearchBar;
