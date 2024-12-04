import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

interface IOperatorItemProps {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
}

class OperatorItem extends Component<IOperatorItemProps> {
    render() {
        const { _id, firstname, lastname, email} = this.props;

        return (
            <div className="redirection-row">
                <div className="redirection-row__items">
                    <span className="redirection-row__item--first">{firstname}</span>
                    <span className="redirection-row__item">{lastname}</span>
                    <span className="redirection-row__item">{email}</span>
                </div>

                <div className="redirection-row__buttons">
                    {/*TODO: Add operator row actions*/}
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(OperatorItem);
