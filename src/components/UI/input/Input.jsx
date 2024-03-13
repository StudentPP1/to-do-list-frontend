import React from 'react';
import './Input.css';

const Input = React.forwardRef((props, ref) => {
    return (
    <div className="input-wrapper">
        <input ref={ref} {...props} className="input" name="email" required autocomplete="off"/>
        <label className="label" for="email"></label>
        <div className="underline"></div>
    </div>
    );
});

export default Input;