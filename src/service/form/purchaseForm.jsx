import React from "react";
import Form from "../../common/form";
import { addButton } from "../../uilts/renderFuncs";
import { withRouter } from "react-router";
import { BACKEND_API_GATE } from "./../../uilts/settings";

class PurchaseForm extends Form {
    state = {
        customer: { customer_id: null, customer_name: null },
        products: [],
        data: { product_id: "" },
        header: { name: "product_id", label: "Select product to purchase:" },
        submitted: false,
    };

    componentDidMount() {
        this.setState({ customer: this.props.match.params });
        fetch(`${BACKEND_API_GATE}/api/product/all`).then(res =>
            res.json().then(products => {
                console.log("invoke componentDidMount", products.length);
                this.setState({
                    products,
                });
                console.log("invoke componentDidMount", this.state);
            })
        );
    }

    doSubmit = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: this.state.customer.customer_id,
                product_id: this.state.data.product_id,
            }),
        };
        fetch(`${BACKEND_API_GATE}/api/purchase/add`, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    console.log("in fetch");
                    this.setState({
                        submitted: true,
                        data: {
                            product_id: "",
                        },
                    });
                }
            })
            .catch(e => {
                console.log("failed fetch");
                console.log("adding error", e);
            });
    };

    isEmpty = () => {
        return this.state.data.product_id === "" ? true : false;
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
        console.log("this.state.products.length:", this.state.products.length);
        return (
            <div style={{ width: "60%" }}>
                {!this.state.products.length ? (
                    <React.Fragment>
                        <p> There are no products in the store.</p>
                        <div className="d-flex justify-content-between">
                            <br />
                            {addButton(
                                "Back",
                                `/purchases/${this.state.customer.customer_id}/${this.state.customer.customer_name}`,
                                "btn btn-primary"
                            )}
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <form
                            onSubmit={this.handleSubmit}
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            {this.renderSelect(
                                this.state.header.name,
                                this.state.header.label,
                                this.state.products
                            )}
                            <div className="d-flex justify-content-between">
                                {this.renderButton("Add New Purchase")}
                                {addButton(
                                    "Cancel",
                                    `/purchases/${this.state.customer.customer_id}/${this.state.customer.customer_name}`,
                                    "btn btn-primary"
                                )}
                            </div>
                        </form>
                        <div
                            className="alert alert-success"
                            role="alert"
                            style={alertStyle}
                        >
                            New purchase added!
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default withRouter(PurchaseForm);
//TODO add new purchase list all products (select)
