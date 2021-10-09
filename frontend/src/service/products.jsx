import React, { Component } from "react";
import _ from "lodash";

import Table from "../common/table";
import Pagination from "../common/pagination";
import { paginate } from "../uilts/paginate";
import { addButton } from "../uilts/renderFuncs";

export default class Products extends Component {
    state = {
        products: [],
        headers: [{ path: "", label: "" }],
        currPage: 1,
        pageSize: 2,
        currSortColumn: { path: "name", order: "asc" },
    };
    getHeaders = [
        { path: "name", label: "Name" },
        { path: "price", label: "Price" },
        { path: "more", label: "More..." },
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
        fetch("http://localhost:5000/api/product/all").then(res =>
            res.json().then(products => {
                this.setState({
                    products,
                });
            })
        );
    }

    handleDelete = (product, productsCount) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id: product.id,
            }),
        };
        fetch("http://localhost:5000/api/product/delete", requestOptions)
            .then(res => {
                if (productsCount === 1) {
                    this.handlePageChange(this.state.currPage - 1);
                }
                const products = this.state.products.filter(
                    c => c.id !== product.id
                );
                this.setState({ products });
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
        const { pageSize, currPage, products, currSortColumn } = this.state;
        //sort:
        let toDisplay = _.orderBy(
            products,
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
            "+ New Product",
            "/products/new",
            "btn btn-success btn-sm"
        );
        return countAll === 0 ? (
            <React.Fragment>
                <p style={{ marginRight: "20px", display: "inline-block" }}>
                    There are no products.
                </p>
                {addBtn}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <p style={{ marginRight: "20px", display: "inline-block" }}>
                    Showing {countAll} products.
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
