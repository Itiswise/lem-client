import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class OrderButtons extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.existingOrder !== prevProps.existingOrder) {
      if (this.returnOrderStatus()) {
        this.props.enableReaderInput();
      } else {
        this.props.disableReaderInput();
      }
    }
  }

  returnOrderStatus() {
    const { _line } = this.props;
    if (this.props.existingOrder) {
      if (this.props.existingOrder.breaks) {
        const { breaks } = this.props.existingOrder;

        const thisLineBreaks = breaks.filter((item) => item._line === _line);

        if (thisLineBreaks.length === 0) {
          return true;
        }

        // is running when this line has breaks on this order AND the last break does have end
        const isOrderRunning =
          thisLineBreaks.length > 0 &&
          thisLineBreaks[thisLineBreaks.length - 1].breakEnd
            ? true
            : false;

        return isOrderRunning;
      } else {
        return true;
      }
    }
  }

  createNewOrder() {
    if (this.props.menu) {
      const orders = this.props.menu.menuContent;

      const filteredOrders = orders.filter(
        (order) => order.orderNumber === this.props.orderNumber
      );

      const details = filteredOrders[0];

      const {
        orderNumber,
        quantity,
        partNumber,
        qrCode,
        tactTime,
        customer,
      } = details;

      const orderInfo = {
        orderNumber,
        quantity,
        partNumber,
        qrCode,
        tactTime,
        customer,
      };

      this.props.createOrder(orderInfo);
    }
  }

  beginNewBreak() {
    const { orderNumber, _line } = this.props;
    this.props.addBreakStart({ orderNumber, _line });
    this.props.pauseOrder();
  }

  endCurrentBreak() {
    const { orderNumber, _line } = this.props;
    this.props.addBreakEnd({ orderNumber, _line });
    this.props.resumeOrder();
  }

  handleStartClick = () => {
    this.createNewOrder();
  };

  handlePauseClick = () => {
    this.beginNewBreak();
  };

  handleResumeClick = () => {
    this.endCurrentBreak();
  };

  handleDeleteClick = () => {
    const { orderNumber } = this.props;
    this.props.deleteOrder({ orderNumber });
  };

  renderStartPauseResumeButtons(orderRunningStatus) {
    if (!this.props.existingOrder) {
      return <button onClick={this.handleStartClick}>START</button>;
    }

    if (orderRunningStatus) {
      return <button onClick={this.handlePauseClick}>PAUSE</button>;
    } else {
      return <button onClick={this.handleResumeClick}>RESUME</button>;
    }
  }

  renderDeleteButton() {
    if (this.props.existingOrder) {
      const isReaderInputEnabled = !this.props.readerInputState.isDisabled;
      return (
        <button
          disabled={isReaderInputEnabled}
          onClick={this.handleDeleteClick}
        >
          DELETE
        </button>
      );
    }
  }

  renderDeleteConfirmation() {
    if (this.props.deleteMessage) {
      return <div>{this.props.deleteMessage}</div>;
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.renderStartPauseResumeButtons(this.returnOrderStatus())}
        </div>
        <div>
          {this.renderDeleteButton()}
          {this.renderDeleteConfirmation()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    orderDetails: state.scanner.orderDetails,
    existingOrder: state.scanner.existingOrder,
    newOrder: state.scanner.newOrder,
    menu: state.scanner.menu,
    isPaused: state.scanner.isPaused,
    isRunning: state.scanner.isRunning,
    errorMessage: state.scanner.errorMessage,
    deleteMessage: state.scanner.deleteMessage,
    readerInputState: state.scanner.readerInputState,
  };
}
export default connect(mapStateToProps, actions)(OrderButtons);
