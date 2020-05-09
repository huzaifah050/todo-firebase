import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from './store/authActions';

function SignedIn({ signOut, name }) {
  // console.log(signOut);
  // console.log(name);

  return (
    <>
      <Link to="/">Home</Link>

      <li>
        <a onClick={signOut}>Logout</a>
      </li>

      <div className="user">Welcome, {name}</div>
    </>
  );
}

const mapStateToProps = (state) => ({
  name: state.firebase.profile.name,
});

const mapDispatchToProps = {
  signOut: signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);
