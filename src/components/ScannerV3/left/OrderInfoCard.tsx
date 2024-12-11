import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OrderType } from "../../../actions";
import { StoreState } from "../../../reducers";
import "./OrderInfoCardStyle.scss";

interface IOrderInfoCardProps {
  orderNumber?: string | null;
  existingOrder?: OrderType;
  readerInputState: {
    isDisabled: boolean;
  };
}

class OrderInfoCard extends Component<IOrderInfoCardProps> {
  renderOrderNumber() {
    if (this.props.existingOrder && this.props.orderNumber) {
      const { orderNumber } = this.props.existingOrder;
      return orderNumber;
    } else {
      return "";
    }
  }

  renderCustomer() {
    if (this.props.existingOrder && this.props.orderNumber) {
      const { customer } = this.props.existingOrder;
      return customer;
    } else {
      return "";
    }
  }

  renderPartNumber() {
    if (this.props.existingOrder && this.props.orderNumber) {
      const { partNumber } = this.props.existingOrder;
      return partNumber;
    } else {
      return "";
    }
  }

  renderQuantity() {
    if (this.props.existingOrder && this.props.orderNumber) {
      const { quantity } = this.props.existingOrder;
      return quantity;
    } else {
      return "";
    }
  }

  renderInProgress() {
    const isInProgress = !this.props.readerInputState.isDisabled;
    return isInProgress ? "orderinfo-card-v3--inprogress" : "";
  }

  render() {
    return (
      <div className="orderinfo-card-v3 ">
        <div className="orderinfo-card-v3__row">
          <span
            className={`orderinfo-card-v3__order ${this.renderInProgress()}`}
          >
            {this.renderOrderNumber()}
          </span>
          <span
            className={`orderinfo-card-v3__customer ${this.renderInProgress()}`}
          >
            {this.renderCustomer()}
          </span>
        </div>
        <div className="orderinfo-card-v3__row">
          <span className={`orderinfo-card-v3__pn ${this.renderInProgress()}`}>
            {this.renderPartNumber()}
          </span>
          <span
            className={`orderinfo-card-v3__quantity ${this.renderInProgress()}`}
          >
            {this.renderQuantity()}
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    existingOrder: state.scanner.existingOrder,
    readerInputState: state.scanner.readerInputState,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
  };
}
export default connect(mapStateToProps, actions)(OrderInfoCard);
