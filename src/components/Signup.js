import React from "react";
import "../App.css";
import * as firebase from 'firebase';
import { Redirect } from "react-router-dom";
class SignIn extends React.Component {

    constructor(props){
        super(props);
        this.state ={ 
            isLoginOpen: true,
            isRegisterOpen: false};
    }

    showLoginBox() {
        this.setState({
            isLoginOpen: true,
            isRegisterOpen: false})
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false})
    }

    render(){
        return(
            <div className="root-controller">

                <div className="box-controller">
                    <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>
                        
                    <div className={"controller " +  + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={this.showRegisterBox.bind(this)}>
                        Register  
                    </div>
                </div>
                <div className="box-container">
                    {this.state.isLoginOpen && <Login /> }
                    {this.state.isRegisterOpen && <Register /> }
                </div>
            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email : "", password : "", redirect: false, errors: [] };
    }
    showValidationErr(elm, msg) {
        this.setState((prevState) => ({ errors: [...prevState.errors, {elm, msg}] } ));
    }
    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm != err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
        this.clearValidationErr("email");
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationErr("password");
    }

    submitLogin(e) {
        console.log(this.state);

        if (this.state.email == "") {
             this.showValidationErr("email", "Email cannot be empty!");
        } else if (this.state.password == "") {
             this.showValidationErr("password", "Password cannot be empty!");
        } else { 
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(res =>{
                localStorage.setItem('user',JSON.stringify(res.user));
                this.setState({redirect : true})
            }).catch(e=>{
                this.showValidationErr('password', e.message)
            })
        }
    }

    render() {
        if (this.state.redirect === true){
            return <Redirect to='/recipes'/>
        }

        let passwordErr = null,
            emailErr = null;

        for(let err of this.state.errors) {
            if (err.elm == "email") {
                emailErr = err.msg;
            }
            if (err.elm == "password") {
                passwordErr = err.msg;
            }
        }

        return(
            <div className="inner-container">
                <div className="header">
                    Login
                </div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="email">Username</label>
                        <input 
                        type="text" 
                        name="email" 
                        className="login-input" 
                        placeholder="Enter Email"
                        onChange={this.onEmailChange.bind(this)}
                        />
                        <small className="danger-error">{ emailErr ? emailErr : "" }</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        className="login-input" 
                        placeholder="Enter Password"
                        onChange={this.onPasswordChange.bind(this)}
                        />
                        <small className="danger-error">{ passwordErr ? passwordErr : "" }</small>
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Login</button>

                </div>
                
            </div>
        );
        
    }
}

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username : "", email : "", password : "", redirect: false, errors: [] };
    }
    showValidationErr(elm, msg) {
        this.setState((prevState) => ({ errors: [...prevState.errors, {elm, msg}] } ));
    }
    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm != err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }
    
    onUsernameChange(e) {
        this.setState({ username: e.target.value });
        this.clearValidationErr("username");
    }
    onEmailChange(e) {
        this.setState({ email: e.target.value });
        this.clearValidationErr("email");
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
        this.clearValidationErr("password");
    }


    submitRegister(e) {
        console.log(this.state);

        if(this.state.username == "") {
             this.showValidationErr("username", "Username cannot be empty!");
        } else if (this.state.email == "") {
             this.showValidationErr("email", "Email cannot be empty!");
        } else if (this.state.password == "") {
             this.showValidationErr("password", "Password cannot be empty!");
        } else { 
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(res =>{
                localStorage.setItem('user',JSON.stringify(res.user));
                this.setState({redirect : true})
            }).catch(e=>{
                this.showValidationErr('password', e.message)
            })
        }



    }

    render() {

        if (this.state.redirect === true){
            return <Redirect to='/recipes'/>
        }

        let usernameErr = null,
            passwordErr = null,
            emailErr = null;

        for(let err of this.state.errors) {
            if(err.elm == "username") {
                usernameErr = err.msg;
            }
            if (err.elm == "email") {
                emailErr = err.msg;
            }
            if (err.elm == "password") {
                passwordErr = err.msg;
            }
        }

        return(
            <div className="inner-container">
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                        type="text" 
                        name="username" 
                        className="login-input" 
                        placeholder="Enter Username"
                        onChange={this.onUsernameChange.bind(this)}
                        />
                        <small className="danger-error">{ usernameErr ? usernameErr : "" }</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        name="email" 
                        className="login-input" 
                        placeholder="Enter Email"
                        onChange={this.onEmailChange.bind(this)}
                        />
                        <small className="danger-error">{ emailErr ? emailErr : "" }</small>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        className="login-input" 
                        placeholder="Enter Password" 
                        onChange={this.onPasswordChange.bind(this)}
                        />
                        <small className="danger-error">{ passwordErr ? passwordErr : "" }</small>
                    </div>

                    <button 
                    type="button" 
                    className="login-btn" 
                    onClick={this.submitRegister.bind(this)}>Register</button>

                </div>
                
            </div>
        )
        
    }
}


export default SignIn;