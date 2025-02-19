import React, { Component, ElementType } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import requireAuth from "../requireAuth";
import OperatorsRouter from "./Operators/OperatorsRouter";
import { StoreState } from "../../reducers";
import "./MainStyle.scss";

interface IManagementOperatorsProps {
    OperatorsRouter: React.ElementType;
}

class ManagementOperators extends Component<IManagementOperatorsProps> {
    render() {
        const { OperatorsRouter } = this.props;
        return (
            <div className="main-page">
                <OperatorsRouter />
            </div>
        );
    }
}

function mapStateToProps(state: StoreState) {
    return {
        authenticated: state.auth.authenticated,
        OperatorsRouter,
    };
}

export default connect(
    mapStateToProps,
    actions
)(requireAuth(ManagementOperators)) as ElementType;
