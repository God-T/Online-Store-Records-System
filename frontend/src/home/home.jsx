import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Customers from "./../service/customers";
import Products from "./../service/products";
import Purchases from "./../service/purchases";
import NavBarHome from "./navBarHome";
import ProductForm from "../service/form/productForm";
import CustomerForm from "../service/form/customerForm";
import purchaseForm from "../service/form/purchaseForm";

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <NavBarHome />
                </header>
                <div className="container">
                    <Switch>
                        {/* switch order with: most specific one --> generate one*/}
                        <Route
                            exact
                            path="/products/new"
                            component={ProductForm}
                        />
                        <Route exact path="/products" component={Products} />{" "}
                        <Route
                            exact
                            path="/customers/new"
                            component={CustomerForm}
                        />
                        <Route
                            exact
                            path="/purchases/:customer_id/:customer_name/new"
                            component={purchaseForm}
                        />
                        <Route
                            exact
                            path="/purchases/:customer_id/:customer_name"
                            component={Purchases}
                        />
                        <Route exact path="/customers" component={Customers} />
                        <Redirect from="/" exact to="/products" />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
