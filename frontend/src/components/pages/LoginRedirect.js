import React from 'react';
import { Link } from 'react-router-dom';

const LoginPageRedirect = () => {
  return (
    <div>
      <h2>You need to sign in to view this page</h2>
      <p>Please <Link to="/">log in</Link> to view this page.</p>
    </div>
  );
}

export default LoginPageRedirect;