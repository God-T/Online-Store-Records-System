import React from "react";
import Form from "./../../common/form";
import { addButton } from "../../uilts/renderFuncs";

class ProductForm extends Form {
    state = {
        data: {
            name: "",
            price: "",
        },
        headers: [
            { name: "name", label: "Enter product name:" },
            { name: "price", label: "Enter product price:" },
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
                price: this.state.data.price,
            }),
        };
        fetch("http://localhost:5000/api/product/add", requestOptions)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        submitted: true,
                        data: {
                            name: "",
                            price: "",
                        },
                    });
                }
            })
            .catch(e => {
                console.log("adding error", e);
            });
    };

    isEmpty = () => {
        return this.state.data.name === "" || this.state.data.price === ""
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
                    <div className="d-flex justify-content-between">
                        {this.renderButton("Add New Product")}
                        {addButton("Cancel", "/products", "btn btn-primary")}
                    </div>
                </form>
                <div
                    className="alert alert-success"
                    role="alert"
                    style={alertStyle}
                >
                    New product added!
                </div>
            </div>
        );
    }
}

export default ProductForm;
