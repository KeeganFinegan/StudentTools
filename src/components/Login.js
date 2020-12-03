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
        62126108860-l9eai98p2qspo0amkhbbsu9e7puhar5e.apps.googleusercontent.com
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
