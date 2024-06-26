import React from 'react';
import {AuthContext} from "../context";
import UserService from "../API/UserService";
import Input from "../components/UI/input/Input"
import Button from "../components/UI/button/Button"

const NewPassword = () => {
    const { isAuth, setIsAuth } = React.useContext(AuthContext);

    function sendPassword(event) {
        var newPassword = event.target[0].value;
        var confirmPassword = event.target[1].value;
        var code = localStorage.getItem("code")
        alert("Password reset successfully!");
        UserService.resetPassword(newPassword, confirmPassword, code)
        .then((r) => {
            window.location.href = "/"
        })
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                sendPassword(e)
            }}>
                <Input
                    type="text"
                    placeholder="Enter new password"
                />

                <Input
                    type="text"
                    placeholder="Confirm password"
                />

                <Button>Submit</Button>
            </form>
        </div>
    );
};

export default NewPassword;