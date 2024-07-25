import React, {useState} from 'react';
import "../styles/Code.css"
import UserService from "../API/UserService";


const Code = () => {
    const [code, setCode] = useState(new Array(6).fill(""));

    var sendCode = localStorage.getItem("code")
    var typeCode = localStorage.getItem("typeCode")

    function handleCodeChange(e, index) {
        // check if value is number
        if (isNaN(e.target.value)) return false

        // put the value in list by index
        setCode([...code.map((data, indx) =>
            (indx === index ? e.target.value : data))]);

        // move to next box
        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
    }

    return (
        <div>
            <h1>Enter verify code</h1>

            <div className="code-area">
                {
                    code.map((data, i) => {
                        return <input
                            className="input-code"
                            type="text"
                            value={data}
                            maxLength={1}
                            onChange={(e) => handleCodeChange(e, i)}
                        />
                    })
                }
            </div>

            <center>
                <button className="button-input-code"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log(sendCode, code.join(""))
                            if (sendCode === code.join("")) {
                                if (typeCode === "reset-password") {
                                    window.location.href = "/new-password"
                                }
                                else {
                                    try {
                                        UserService.activateAccount(code.join("")).then((r) => {
                                            localStorage.setItem("refresh_token", r.refresh_token);
                                            localStorage.setItem('IsAuth', "1");
                                            window.location.href = "/Today";
                                        })
                                    } catch (e) {
                                        localStorage.setItem('IsAuth', "0");
                                    }
                                }
                            }
                        }}>
                    Submit
                </button>
            </center>
        </div>
    );
};

export default Code;