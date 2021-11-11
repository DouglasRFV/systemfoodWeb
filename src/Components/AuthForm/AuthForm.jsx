import { useState } from "react";
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

    const authenticateUser  = async (email, password) => {
        console.log(email, password);
    
        try {
            const user = await auth.signInWithEmailAndPassword(email, password);
            console.log('USER =>', user);
            if(user.user.uid) {
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

    // )

    return (
        <div>
            <div className="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                    <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                    <form>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                        name="loginEmail"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                        name="loginPassword"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                        Remember password
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold"
                        onClick = {() => authenticateUser (loginEmail, loginPassword)}>Sign
                        in</button>
                    </div>
                    <hr className="my-4" />
                    {/* <div className="d-grid mb-2">
                        <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                        <i className="fab fa-google me-2"></i> Sign in with Google
                        </button>
                    </div> */}
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        
    );
}

