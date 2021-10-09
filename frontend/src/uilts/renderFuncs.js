import { Link } from "react-router-dom";
import React from "react";

export const addButton = (title, toPath, bootstrap_className) => (
    <React.Fragment>
        <Link to={toPath}>
            <button className={bootstrap_className}>{title}</button>
        </Link>
        {/* <SearchBar
        value={this.state.currSearchQuery}
        onChange={this.handleSearch}
    /> */}
    </React.Fragment>
);
