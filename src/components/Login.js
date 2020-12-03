import React from 'react';
import ReactDOM from 'react-dom';

// or
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
};

const Login = () => {
  return (
    <div className="login">
      <GoogleLogin
        clientId="
        https://5e347845fbfd.ngrok.io/connect/google
        "
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
