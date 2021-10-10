import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import Table from "../common/table";
import Pagination from "../common/pagination";
import { paginate } from "../uilts/paginate";
import { addButton } from "../uilts/renderFuncs";
import { BACKEND_API_GATE } from "./../uilts/settings";

export default class Customers extends Component {
    state = {
        customers: [],
        headers: [{ path: "", label: "" }],
        currPage: 1,
        pageSize: 5,
        currSortColumn: { path: "name", order: "asc" },
    };

    getHeaders = [
        { path: "name", label: "Name" },
        { path: "contact", label: "Contact" },
        { path: "more", label: "More..." },
        {
            key: "view-purchases",
            content: singlebodyData => (
                <Link
                    to={`/purchases/${singlebodyData.id}/${singlebodyData.name}`}
                >
                    <button
                        style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                        }}
                        className="btn btn-outline-info"
                    >
                        View Purchases
                    </button>
                </Link>
            ),
        },
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
        fetch(`${BACKEND_API_GATE}/api/customer/all`).then(res =>
            res.json().then(customers => {
                this.setState({
                    customers,
                });
            })
        );
    }

    handleDelete = (customer, customersCount) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: customer.id,
            }),
        };
        fetch(`${BACKEND_API_GATE}/api/customer/delete`, requestOptions)
            .then(res => {
                if (customersCount === 1)
                    this.handlePageChange(this.state.currPage - 1);
                const customers = this.state.customers.filter(
                    c => c.id !== customer.id
                );
                this.setState({ customers });
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
        const { pageSize, currPage, customers, currSortColumn } = this.state;
        //sort:
        let toDisplay = _.orderBy(
            customers,
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
            "+ New Customer",
            "/customers/new",
            "btn btn-success btn-sm"
        );
        return countAll === 0 ? (
            <React.Fragment>
                <p style={{ marginRight: "20px", display: "inline-block" }}>
                    There are no customers.
                </p>
                {addBtn}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <p style={{ marginRight: "20px", display: "inline-block" }}>
                    Showing {countAll} customers.
                </p>
                <span style={{ marginTop: "3px" }}>{addBtn}</span>
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
