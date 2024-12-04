import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OperatorsListType } from "../../../actions";
import { StoreState } from "../../../reducers";
import OperatorItem from "./OperatorItem";
import "./OperatorsListStyle.scss";
import ReactPaginate from 'react-paginate';
import { itemsPerPage } from "../../../config";

interface IOperatorsListProps {
    operators?: OperatorsListType[];
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
        const pageCount = this.props.allOperatorsCount ? Math.ceil(this.props.allOperatorsCount / itemsPerPage) : 0;

        return (
            <div className="operator-page">
                <div className="operator-page__header">
                    {/*TODO: Add header create operator action*/}
                </div>
                <div className="operators-list__header">
                    <span className="operators-list__header__item--first">operators</span>
                </div>
                <div className="operators-list">
                    { this.props.operators && this.props.operators.map((operator) => <OperatorItem
                        key={operator._id}
                        _id={operator._id}
                        firstname={operator.firstname}
                        lastname={operator.lastname}
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
