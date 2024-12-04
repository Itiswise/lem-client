import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {OperatorsListType} from "../../../actions";

interface IOperatorItemProps {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    __v: number;
    startEditingOperator: (Operator: OperatorsListType) => void;
    openDeleteOperatorModal: ({ _id }: { _id: string }) => void;
}

class OperatorItem extends Component<IOperatorItemProps> {
    render() {
        const { _id, firstname, lastname, email, __v, openDeleteOperatorModal, startEditingOperator} = this.props;

        return (
            <div className="redirection-row">
                <div className="redirection-row__items" style={{padding: '16px 0'}}>
                    <span className="redirection-row__item--first">{firstname}</span>
                    <span className="redirection-row__item">{lastname}</span>
                    <span className="redirection-row__item">{email}</span>
                </div>

                <div className="redirection-row__buttons">
                    <button
                        className="btn btn--finish btn--thin"
                        onClick={() => {
                            startEditingOperator({
                                _id,
                                firstname,
                                lastname,
                                email,
                                __v
                            });
                        }}
                    >
                        EDIT
                    </button>
                    <button
                        className="btn btn--delete btn--thin"
                        onClick={() => {
                            openDeleteOperatorModal({ _id });
                        }}
                    >
                        DELETE
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(OperatorItem);
