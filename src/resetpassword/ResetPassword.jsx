import React from 'react';
import Input from "../components/UI/input/Input"
import '../styles/ResetPassword.css'
import UserService from "../API/UserService";

const ResetPassword = () => {
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                var email = e.target[0].value
                UserService.forgotPassword(email).then(r => {
                    if (r == null) {
                        alert("You haven't account yet, please register!")
                        window.location.href = "/"
                    }
                    else {
                        localStorage.setItem("code", r);
                        localStorage.setItem("typeCode", "reset-password");
                        window.location.href = "/code"
                    }
                })


            }}>
                <div className="label-password">
                    Reset your password
                </div>
                <Input type="email" placeholder="Enter email"/>
            </form>
        </div>
    );
};

export default ResetPassword;