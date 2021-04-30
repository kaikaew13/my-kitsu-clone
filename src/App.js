import React from 'react';
import { connect } from 'react-redux';

import NavContainer from './containers/navigation/nav-container';
import SectionContainer from './containers/section/section-container';
import GenreContainer from './containers/genre/genre-container';
import Modal from './containers/modal/modal';
import Backdrop from './components/UI/backdrop';

function App(props) {
  return (
    <div className="App">
      {props.showModal ? (
        <React.Fragment>
          <Modal />
          <Backdrop class="backdrop-dark" clicked={props.toggleShowModal} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: () => dispatch({ type: 'CLOSE_MODAL' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
