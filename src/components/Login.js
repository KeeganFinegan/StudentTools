import React from 'react';
import ReactDOM from 'react-dom';

// or
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router';

const responseGoogle = (response) => {
  console.log(response);
};

const Login = () => {
  return (
    <div className="login">
      <button
        onClick={() => {
          window.location.replace(
            'https://5e347845fbfd.ngrok.io/connect/google'
          );
        }}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Login;
