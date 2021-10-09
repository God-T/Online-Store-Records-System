import React, { Component } from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
export default class Table extends Component {
    render() {
        const { headers, bodyData, onSort, currSortColumn, countDisplayed } =
            this.props;
        return (
            <table className="table table-sm ">
                <TableHead
                    tableHeaders={headers}
                    currSortColumn={currSortColumn}
                    onSort={onSort}
                />
                <TableBody
                    bodyData={bodyData}
                    columnNames={headers}
                    countDisplayed={countDisplayed}
                />
            </table>
        );
    }
}
