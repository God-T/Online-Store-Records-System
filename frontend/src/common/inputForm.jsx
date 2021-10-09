import React from "react";

const InputForm = ({ name, label, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} className="form-control" id={name} name={name} />
        </div>
    );
};

export default InputForm;
