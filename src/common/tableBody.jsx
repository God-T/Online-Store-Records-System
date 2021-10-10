import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
    renderCol = (colName, item, countDisplayed) => {
        if (colName.content) {
            return colName.content(item, countDisplayed);
        }
        return _.get(item, colName.path); //handle muti path of objects e.g item.genre.name
    };

    generateKey = (item, colName) => {
        return item.id + (colName.path || colName.key);
    };

    render() {
        const { bodyData, columnNames, countDisplayed } = this.props;

        return (
            <tbody>
                {bodyData.map(item => {
                    return (
                        <tr key={item.id}>
                            {columnNames.map(colName => (
                                <td key={this.generateKey(item, colName)}>
                                    {this.renderCol(
                                        colName,
                                        item,
                                        countDisplayed
                                    )}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        );
    }
}

export default TableBody;
