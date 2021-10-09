import React, { Component } from "react";

class TableHead extends Component {
    sorting = (path) => {
        const currSortColumn = { ...this.props.currSortColumn };
        if (currSortColumn.path === path) {
            currSortColumn.order =
                currSortColumn.order === "asc" ? "desc" : "asc";
        } else {
            currSortColumn.path = path;
            currSortColumn.order = "asc";
        }
        this.props.onSort(currSortColumn);
    };

    sortIcon = (header) => {
        const { currSortColumn } = this.props;
        if (!header.path) return null;
        if (header.path !== currSortColumn.path)
            return <i className="fa fa-sort"></i>;
        if (currSortColumn.order === "asc")
            return <i className="fa fa-sort-asc"></i>;
        if (currSortColumn.order === "desc")
            return <i className="fa fa-sort-desc"></i>;
    };

    render() {
        return (
            <thead>
                <tr>
                    {this.props.tableHeaders.map((header) => (
                        <th
                            className="clickable"
                            key={header.path || header.key}
                            onClick={() => this.sorting(header.path)}
                        >
                            {header.label} {this.sortIcon(header)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHead;
