import React from 'react';

import NavContainer from './containers/navigation/nav-container';
import SectionContainer from './containers/section/section-container';
import GenreContainer from './containers/genre/genre-container';

function App() {
  return (
    <div className="App">
      <NavContainer />
      <SectionContainer />
      <GenreContainer />
    </div>
  );
}

export default App;
