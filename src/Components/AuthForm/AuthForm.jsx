import { useState } from "react";
// import { useState, Fragment } from "react";
// import { Card, Menu, Form, Button } from "semantic-ui-react";
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom';
// import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import "./AuthForm.css";



export default function AuthForm() {
  const history = useHistory();
  // const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // const [signupEmail, setSignupEmail] = useState("");
  // const [signupPassword, setSignupPassword] = useState("");

  const authenticateUser = async (email, password) => {
    console.log(email, password);

    try {
      // const user = isLogin
      //     ? await auth.signInWithEmailAndPassword(email, password)
      //     : await auth.createUserWithEmailAndPassword(email, password);

      const user = await auth.signInWithEmailAndPassword(email, password)

      if (user.user.uid) {
        localStorage.setItem("uid", user.user.uid);
        history.push("/");
      } else {
        history.push("/");
      }
      console.log('DADOS USER =>', user);
    } catch (err) {
      console.log(err);
    }
  }



  // return (
  // <div className="auth-form-wrapper">
  // <Card className="auth-form-card">
  //     <Card.Content>
  //     <Card.Header className="auth-form-header">Auth Form</Card.Header>
  //     <Menu compact secondary>
  //         <Menu.Item
  //         name="Login"
  //         onClick={() => setIsLogin(true)}
  //         active={isLogin}
  //         ></Menu.Item>
  //         <Menu.Item
  //         name="Sign up"
  //         onClick={() => setIsLogin(false)}
  //         active={!isLogin}
  //         ></Menu.Item>
  //     </Menu>
  //     {isLogin ? (
  //         <Fragment>
  //         <Form>
  //             <Form.Field className="auth-form-fields">
  //             <label className="form-labels">Email</label>
  //             <input
  //                 placeholder="Email Address"
  //                 name="loginEmail"
  //                 type="email"
  //                 value={loginEmail}
  //                 onChange={(e) => setLoginEmail(e.target.value)}
  //             ></input>
  //             </Form.Field>
  //             <Form.Field className="auth-form-fields">
  //             <label className="form-labels">Password</label>
  //             <input
  //                 placeholder="Password"
  //                 name="loginPassword"
  //                 type="password"
  //                 value={loginPassword}
  //                 onChange={(e) => setLoginPassword(e.target.value)}
  //             ></input>
  //             </Form.Field>
  //             <Button onClick = {() => authenticateUser (loginEmail, loginPassword, true)} className="auth-form-buttons" color="green">
  //             Login
  //             </Button>
  //         </Form>
  //         <div className="google-login"></div>
  //         </Fragment>
  //     ) : (
  //         <Fragment>
  //         <Form>
  //         <Form.Field className="auth-form-fields">
  //             <label className="form-labels">Email</label>
  //             <input
  //             placeholder="Email Address"
  //             name="signUpEmail"
  //             type="email"
  //             value={signupEmail || ""}
  //             onChange={(e) => setSignupEmail(e.target.value)}
  //             ></input>
  //         </Form.Field>
  //         <Form.Field className="auth-form-fields">
  //             <label className="form-labels">Password</label>
  //             <input
  //             placeholder="Password"
  //             name="signUpPassword"
  //             type="password"
  //             value={signupPassword || ""}
  //             onChange={(e) => setSignupPassword(e.target.value)}
  //             ></input>
  //         </Form.Field>
  //         <Button
  //             onClick = {() => authenticateUser (signupEmail, signupPassword, false)}
  //             className="auth-form-buttons"
  //             color="teal"
  //         >
  //             Sign up
  //         </Button>
  //         </Form>
  //         <div className="google-login"></div>
  //         </Fragment>
  //     )}
  //     </Card.Content>
  // </Card>
  // </div>

  // );

  return (
    <div className="wrapper">
      <div className="logo"> <img src="/logo.png" alt="" /> </div>
      <div className="text-center mt-4 name"> SystemFood </div>
      <form className="p-3 mt-3">
        <div className="form-field d-flex align-items-center"> <span className="far fa-user"></span>
          <input
            placeholder="Email Address"
            name="loginEmail"
            type="email"
            value={loginEmail || ""}
            onChange={(e) => setLoginEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-field d-flex align-items-center"> <span className="fas fa-key"></span>
          <input
            placeholder="Password"
            name="loginPassword"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          ></input>
        </div>
        <button className="btn mt-3" onClick={() => authenticateUser(loginEmail, loginPassword)} >Login</button>
      </form>
      {/* <div className="text-center fs-6"> <a href="#">Forget password?</a> or <a href="#">Sign up</a> </div> */}
    </div>
  );
}

