import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import "./OperatorItemStyle.scss";

interface IOperatorItemProps {
    _id: string;
    firstname: string;
    lastname: string;
}

class OperatorItem extends Component<IOperatorItemProps> {
    render() {
        const { _id, firstname, lastname} = this.props;

        return (
            <div className="operator-row">
                <div className="operator-row__items">
                    <span className="operator-row__item--first">{`${firstname} ${lastname}`}</span>
                </div>

                <div className="operator-row__buttons">
                    {/*TODO: Add operator row actions*/}
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(OperatorItem);
