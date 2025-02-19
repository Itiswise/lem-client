import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderType } from "../../../actions";
import { StoreState } from "../../../reducers";
import "./DoneTodoCardStyle.scss";

interface IDoneTodoCardProps {
  orderNumber?: string | null;
  existingOrder?: OrderType;
  _line: string | null;
}

class DoneTodoCard extends Component<IDoneTodoCardProps> {
  renderDoneOnThisLine() {
    if (this.props.existingOrder && this.props.orderNumber) {
      const { scans } = this.props.existingOrder;
      const { _line } = this.props;
      const scansWithoutErrorsOnThisLine = scans?.filter(
        (scan) =>
          (scan.errorCode === "e000" || scan.errorCode === "e004") &&
          scan._line === _line
      ).length;
      return scansWithoutErrorsOnThisLine?.toString();
    } else {
      return 0;
    }
  }

  renderTodo() {
    if (this.props.existingOrder && this.props.orderNumber) {
      const { scans, quantity } = this.props.existingOrder;
      if (!quantity) {
        return 0;
      }
      const scansWithoutErrors = scans
        ? scans.filter(
            (scan) => scan.errorCode === "e000" || scan.errorCode === "e004"
          ).length
        : 0;
      return (quantity - scansWithoutErrors).toString();
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="donetodo-card-v3">
        <span className="donetodo-card-v3__item">
          <span>done: </span>
          <span className="donetodo-card-v3__value">
            {this.renderDoneOnThisLine()}
          </span>
        </span>

        <span className="donetodo-card-v3__item">
          <span>todo: </span>
          <span className="donetodo-card-v3__value">{this.renderTodo()}</span>
        </span>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    existingOrder: state.scanner.existingOrder,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
  };
}
export default connect(mapStateToProps, actions)(DoneTodoCard);
