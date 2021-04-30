import React, { useState } from 'react';

import NavContainer from './containers/navigation/nav-container';
import SectionContainer from './containers/section/section-container';
import GenreContainer from './containers/genre/genre-container';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';

function App() {
  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };
  return (
    <div className="App">
      {showModal ? (
        <React.Fragment>
          <Modal />
          <Backdrop class="backdrop-dark" clicked={toggleModal} />
        </React.Fragment>
      ) : null}

      <NavContainer />
      <SectionContainer />
      <GenreContainer />
    </div>
  );
}

export default App;
