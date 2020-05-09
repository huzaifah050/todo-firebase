import React from 'react';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { connect } from 'react-redux';

function Navbar({ auth }) {
  // console.log(auth);

  const links = auth.uid ? <SignedIn /> : <SignedOut />;
  return <nav className="navbar">{links}</nav>;
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps)(Navbar);
