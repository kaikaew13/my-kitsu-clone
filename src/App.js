import React, { useState } from 'react';
import { connect } from 'react-redux';

import NavContainer from './containers/navigation/nav-container';
import SectionContainer from './containers/section/section-container';
import GenreContainer from './containers/genre/genre-container';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';

function App(props) {
  // const [showModal, setShowModal] = useState(true);
  // const toggleModal = () => {
  //   setShowModal((prevState) => !prevState);
  // };
  console.log(props.showModal);
  return (
    <div className="App">
      {props.showModal ? (
        <React.Fragment>
          <Modal />
          <Backdrop class="backdrop-dark" />
        </React.Fragment>
      ) : null}

      <NavContainer />
      <SectionContainer />
      <GenreContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showModal: state.showModal,
  };
};

export default connect(mapStateToProps)(App);
