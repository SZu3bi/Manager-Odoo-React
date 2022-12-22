import React, {Component, useState} from "react";
import axios from "axios";
import {
    Paper,
    RaisedButton,
    TextField
} from "material-ui";
import Translation from "../utils/Translation"
import PubSub from "pubsub-js";
import Constants from "../Constants";
import IconButton from "material-ui/IconButton";
import { LoginUser } from "../Services/APIServices";
export const LoginPage = () => {

    const [states, setStates] = useState({
        username: "",
        password: "",
        errorUsername: "",
        errorPassword: ""
      });





    const Login = async () => {
        const result = await LoginUser(states.username, states.password);
        if (result) {
       console.log('pass')
        } else {
          console.log("err");
        }
      };

      const  handleSubmit =(event) => {
        event.preventDefault();
        PubSub.publish(Constants.LOADING, true);
        if (this.state.password.length < 1 || this.state.username.length < 1) {
            if (this.state.username.length < 1)
                this.setState({errorUsername: "Username is required"});
            if (this.state.password.length < 1)
                this.setState({errorPassword: "Password is required"});
            return;
        }
        let config = {
            url: "authenticate",
            method: 'post',
            auth: {
                username: this.state.username,
                password: this.state.password
            }
        };
        axios(config)
            .then(function (response) {
                sessionStorage.setItem("AUTH_TOKEN", response.data.data.token);
                sessionStorage.setItem("userId", response.data.data.user.id);
                sessionStorage.setItem("userLevel", response.data.data.user.level);
                sessionStorage.setItem("username", response.data.data.user.firstname);
                PubSub.publish(Constants.AUTHENTICATED, true);
                PubSub.publish(Constants.LOADING, false);
            })
            .catch(function (error) {
                if (error.response) {
                    let message = Translation.translateMessage(error.response.data.messages);
                    PubSub.publish(Constants.MESSAGE, message);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                PubSub.publish(Constants.LOADING, false);
            });
    }

  
        return (
            <div 
                  style={{
                      display: "flex",
                      justifyContent: "center"
                  }}>
                <Paper style={{padding: "2em"}}>
                    <h1>Sign In</h1>
                
                     <TextField
            label="username"
            variant="outlined"
            value={states.username}
            onChange={(event) => {
              setStates((username) => ({
                ...username,
                username: event.target.value,
              }));
            }}></TextField>
                     <TextField
            label="password"
            variant="outlined"
            value={states.password}
            onChange={(event) => {
              setStates((password) => ({
                ...password,
                password: event.target.value,
              }));
            }}></TextField>
                         <IconButton
                color="inherit"
                onClick={() => {
                    Login();
                }}
              >
                Sign In
              </IconButton>
                   
                </Paper>
            </div>
        );
    }


export default LoginPage;
