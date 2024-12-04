import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import requireAuth from "../../requireAuth";
import { ActionTypes } from "../../../actions/types";
import { StoreState } from "../../../reducers";
import OperatorsList from "./OperatorsList";
import AddOperator from "./AddOperator";

interface IOperatorsRouterProps {
    activeOperatorsComponent: ActionTypes;
    OperatorsList: ElementType;
    AddOperator: ElementType;
}

class OperatorsRouter extends Component<IOperatorsRouterProps> {
    renderOperatorsComponent(activeComponent: ActionTypes) {
        const {
            OperatorsList,
        } = this.props;
        switch (activeComponent) {
            case ActionTypes.NEW:
                return <AddOperator />;
            case ActionTypes.LIST:
                return <OperatorsList />;
            default:
                return <OperatorsList />;
        }
    }

    render() {
        return (
            <>
                {this.renderOperatorsComponent(this.props.activeOperatorsComponent)}
            </>
        );
    }
}

function mapStateToProps(state: StoreState) {
    return {
        activeOperatorsComponent: state.dashboard.activeOperatorComponent,
        OperatorsList,
        AddOperator,
    };
}

export default connect(
    mapStateToProps,
    actions
)(requireAuth(OperatorsRouter));
