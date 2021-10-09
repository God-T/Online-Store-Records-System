import React from "react";
import Form from "./../../common/form";
import { addButton } from "../../uilts/renderFuncs";

class CustomerForm extends Form {
    state = {
        data: {
            name: "",
            contact: "",
        },
        headers: [
            { name: "name", label: "Enter customer name:" },
            { name: "contact", label: "Enter customer contact:" },
        ],
        submitted: false,
    };

    doSubmit = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: this.state.data.name,
                contact: this.state.data.contact,
            }),
        };
        fetch("http://localhost:5000/api/customer/add", requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        submitted: true,
                        data: {
                            name: "",
                            contact: "",
                        },
                    });
                }
            })
            .catch(e => {
                console.log("adding error", e);
            });
    };

    isEmpty = () => {
        return this.state.data.name === "" || this.state.data.contact === ""
            ? true
            : false;
    };

    render() {
        let alertStyle = this.state.submitted
            ? {
                  marginTop: "10px",
                  visibility: "visible",
              }
            : {
                  marginTop: "10px",
                  visibility: "hidden",
              };
        return (
            <div style={{ width: "60%" }}>
                <form
                    onSubmit={this.handleSubmit}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    {this.state.headers.map(({ name, label }) => (
                        <div key={name + label}>
                            {this.renderInput(name, label)}
                        </div>
                    ))}
                    <div>
                        <div className="d-flex justify-content-between">
                            {this.renderButton("Add New Customer")}
                            {addButton(
                                "Cancel",
                                "/customers",
                                "btn btn-primary"
                            )}
                        </div>
                    </div>
                </form>
                <div
                    className="alert alert-success"
                    role="alert"
                    style={alertStyle}
                >
                    New customer added!
                </div>
            </div>
        );
    }
}

export default CustomerForm;
