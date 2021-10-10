import React from "react";

const Select = ({ name, label, options, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control" id={name} name={name} {...rest}>
                <option value="">Choose here</option>
                {options.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
