import React from 'react';
import { Link } from 'react-router-dom';

function SignedOut() {
  return (
    <>
      <Link to="/signIn">Sign in</Link>
      <Link to="/signUp">Sign up</Link>
    </>
  );
}

export default SignedOut;
