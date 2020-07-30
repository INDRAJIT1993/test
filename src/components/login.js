import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
require('dotenv').config()

class login extends Component {
    // constructor(){
    //     if (localStorage.getItem('usertoken') !== "" || localStorage.getItem('usertoken') !=null){
    //         window.location.href = '/Users'
    //     }
    // }
    onSubmit(e) {
        e.preventDefault();

        let email = document.getElementById('email').value;
        let Password = document.getElementById('Password').value;
        console.log("gggg", email, Password);
        if (Password && email !== undefined) {
            toast.info('please wait...', {
                position: toast.POSITION.TOP_CENTER
            });

            axios.post(`https://reqres.in/api/login`, {
                email: email,
                password: Password,
            }).then(response => {

                if (response.data.token) {
                    localStorage.setItem('usertoken', response.data.token);
                    toast("user logged in", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(function () { window.location.href = '/Users' }, 2000)
                }
                else
                {
                    toast("user not present ", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }

            }).catch(error => {
                console.log('2', error);
                toast("some error occurred, email password conination is not correct ", {
                    position: toast.POSITION.TOP_CENTER
                });

            })
        }
    }

    render() {
        return (
            <div className="login-3 tab-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-pad-0 form-section">
                            <div className="login-inner-form">
                                <div className="details">
                                    <div className="col-md-12 heading-bx left" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                        <h3 className="title-head">Login</h3>
                                    </div>
                                    <form name="frm" onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <input type="email" name="name" id="email" className="input-text" placeholder="Email" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="email" id="Password" className="input-text" placeholder="Password" required />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn-md btn-theme btn-block">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default login