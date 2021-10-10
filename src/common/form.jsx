import React, { Component } from "react";
import InputForm from "./inputForm";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        submitted: false,
    };

    handleSubmit = event => {
        event.preventDefault();
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const data = this.state.data;
        this.state.data[input.name] = input.value;
        console.log("input.value: ", input.value);
        this.setState({ data, submitted: false });
    };

    renderButton = (label, ...rest) => {
        return (
            <button
                type="submit"
                disabled={this.isEmpty()}
                className="btn btn-primary"
                {...rest}
            >
                {label}
            </button>
        );
    };

    renderSelect = (name, label, options) => {
        const { data } = this.state;
        return (
            <Select
                name={name}
                label={label}
                options={options}
                value={data[name]}
                onChange={this.handleChange}
            />
        );
    };

    renderInput = (name, label, type = "text") => {
        const { data } = this.state;
        return (
            <InputForm
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
            />
        );
    };
}

export default Form;
