import React from "react";
import _ from "lodash";

import Table from "../common/table";
import Pagination from "../common/pagination";
import { paginate } from "../uilts/paginate";
import { addButton } from "../uilts/renderFuncs";
import { withRouter } from "react-router";
import { BACKEND_API_GATE } from "./../uilts/settings";

class Purchases extends React.Component {
    state = {
        customer: { id: "", name: "" },
        purchases: [],
        headers: [{ path: "", label: "" }],
        currPage: 1,
        pageSize: 5,
        currSortColumn: { path: "name", order: "asc" },
    };

    getHeaders = [
        { path: "product.name", label: "Product" },
        {
            key: "delete",
            content: (singlebodyData, count) => (
                <button
                    onClick={() => this.handleDelete(singlebodyData, count)}
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    className="btn btn-danger btn-sm"
                >
                    X
                </button>
            ),
        },
    ];

    componentDidMount() {
        const { customer_id, customer_name } = this.props.match.params;
        console.log(customer_id);
        this.setState({
            customer: { id: customer_id, name: customer_name },
        });
        fetch(
            `${BACKEND_API_GATE}/api/purchase?customer_id=${customer_id}`
        ).then(res =>
            res.json().then(purchases => {
                console.log("purchases", purchases);
                purchases.forEach(purchase => {
                    fetch(
                        `${BACKEND_API_GATE}/api/product/${purchase.product_id}`
                    ).then(res =>
                        res.json().then(product => {
                            console.log("product", product);
                            console.log("data", { id: purchase.id, product });
                            this.setState({
                                purchases: [
                                    { id: purchase.id, product },
                                    ...this.state.purchases,
                                ],
                            });
                            console.log("state", this.state.purchases);
                        })
                    );
                });
            })
        );
    }
    // /api/product/:product_id
    handleDelete = (purchase, productsCount) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: purchase.id,
            }),
        };
        fetch(`${BACKEND_API_GATE}/api/purchase/delete`, requestOptions)
            .then(() => {
                if (productsCount === 1) {
                    this.handlePageChange(this.state.currPage - 1);
                }
                const purchases = this.state.purchases.filter(
                    c => c.id !== purchase.id
                );
                this.setState({ purchases });
            })
            .catch(e => {
                console.log("delete error", e);
            });
    };

    handlePageChange = page => {
        this.setState({ currPage: page });
    };
    handleSort = currSortColumn => {
        this.setState({ currSortColumn });
    };

    getPagedData = () => {
        const { pageSize, currPage, purchases, currSortColumn } = this.state;
        //sort:
        let toDisplay = _.orderBy(
            purchases,
            [currSortColumn.path],
            [currSortColumn.order]
        );
        //count all
        const countAll = toDisplay.length;
        //pagindate:
        toDisplay = paginate(toDisplay, currPage, pageSize);
        return { toDisplay, countAll };
    };

    displayingData = ({ toDisplay, countAll }) => {
        const { pageSize, currPage, currSortColumn } = this.state;
        const addBtn = addButton(
            "+ New Purchase",
            `/purchases/${this.state.customer.id}/${this.state.customer.name}/new`,
            "btn btn-success btn-sm"
        );
        const backBtn = (
            <div style={{ width: "80%" }}>
                <div className="d-flex justify-content-between">
                    <br />
                    {addButton("Back", "/customers", "btn btn-primary")}
                </div>
            </div>
        );

        return countAll === 0 ? (
            <React.Fragment>
                <p style={{ marginRight: "20px", display: "inline-block" }}>
                    There are no purchases for{" "}
                    <strong
                        className="text-info"
                        style={{ fontSize: "larger" }}
                    >
                        {this.state.customer.name}
                    </strong>
                    .
                </p>
                <span style={{ position: "relative", bottom: "2px" }}>
                    {addBtn}
                </span>
                {backBtn}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <p style={{ marginRight: "20px", display: "inline-block" }}>
                    Showing {countAll} purchases for{" "}
                    <strong
                        className="text-info"
                        style={{ fontSize: "larger" }}
                    >
                        {this.state.customer.name}
                    </strong>
                    .
                </p>
                <span style={{ position: "relative", bottom: "2px" }}>
                    {addBtn}
                </span>

                <div style={{ width: "70%" }}>
                    <Table
                        bodyData={toDisplay}
                        onSort={this.handleSort}
                        headers={this.getHeaders}
                        currSortColumn={currSortColumn}
                        countDisplayed={toDisplay.length}
                    />
                    <br style={{ height: "300px" }} />

                    <Pagination
                        itemsCount={countAll}
                        pageSize={pageSize}
                        currPage={currPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
                {backBtn}
            </React.Fragment>
        );
    };

    render() {
        return (
            <div className="row">
                <div className="col">
                    {this.displayingData(this.getPagedData())}
                </div>
            </div>
        );
    }
}
export default withRouter(Purchases);
