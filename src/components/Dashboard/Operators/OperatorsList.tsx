import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {OperatorsListType, StartAddingOperatorAction} from "../../../actions";
import { StoreState } from "../../../reducers";
import OperatorItem from "./OperatorItem";
import ReactPaginate from 'react-paginate';

interface IOperatorsListProps {
    operators?: OperatorsListType[];
    startAddingOperator: () => StartAddingOperatorAction;
    allOperatorsCount?: number;
    getOperators: (page?: number) => void;
}
interface IOperatorsListState {
    page: number;
}

class OperatorsList extends Component<IOperatorsListProps, IOperatorsListState> {
    constructor(props: IOperatorsListProps) {
        super(props);
        this.state = { page: 1 };
    }

    componentDidMount() {
        this.getOperatorsList();
    }

    handlePageClick(event: any) {
        this.setState({ page: event.nextSelectedPage + 1 }, () => {
            this.getOperatorsList();
        });
    }

    getOperatorsList() {
        this.props.getOperators(this.state.page);
    }

    render() {
        const pageCount = this.props.allOperatorsCount || 0;

        return (
            <div className="redirection-page">
                <div className="redirection-page__header">
                    <h1 className="main-page__title">Operators List</h1>
                    <button
                        className="btn btn--accent"
                        onClick={this.props.startAddingOperator}
                    >
                        ADD OPERATOR
                    </button>
                </div>
                <div className="redirections-list__header">
                    <span className="redirections-list__header__item--first">firstname</span>
                    <span className="redirections-list__header__item">lastname</span>
                    <span className="redirections-list__header__item">email</span>
                </div>
                <div className="redirections-list">
                    { this.props.operators && this.props.operators.map((operator) => <OperatorItem
                        key={operator._id}
                        _id={operator._id}
                        firstname={operator.firstname}
                        lastname={operator.lastname}
                        email={operator.email}
                        __v={operator.__v}
                    />)}
                </div>
                { pageCount > 1 && <ReactPaginate
                    className="pagination"
                    pageCount={pageCount}
                    forcePage={this.state.page - 1}
                    onClick={(e) => {
                        this.handlePageClick(e);
                    }}
                />}
            </div>
        );
    }
}

function mapStateToProps(state: StoreState) {
    const { operators, allOperatorsCount } = state.dashboard;
    return {
        operators,
        allOperatorsCount,
    };
}

export default connect(mapStateToProps, actions)(OperatorsList);
