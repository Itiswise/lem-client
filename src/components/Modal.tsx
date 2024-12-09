import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import {StoreState} from "../reducers";
import {IModalState} from "../reducers/modalReducer";
import "./ModalStyle.scss";
import OperatorPicker from "./Scanner/modal/OperatorPicker";
import {IAddBreakEnd, ICreateOrder, MenuDataType, ResumeOrderAction} from "../actions";
import {ValidOperators} from "../utils/operators";

interface IModalProps extends IModalState {
  orderNumber?: string | null;
  _line?: string | null;
  orderNumberFromStats: string | null;
  closeModal: (callbackOnClose?: () => void) => actions.CloseModalAction;
  closeOrder: ({ orderNumber }: actions.ICloseOrder) => void;
  deleteOrder: ({ orderNumber }: actions.IDeleteOrder) => void;
  deleteRedirection: (redirectionId?: string) => void;
  deleteProduct: (productId?: string) => void;
  deleteOperator: (operatorId?: string) => void;
  deletePartnumber: (partnumberId?: string) => void;
  callbackOnClose?: () => void;
  errorMessage: string | undefined;
  operators: ValidOperators;
  menu: MenuDataType;
  createOrder: ({
    orderNumber,
    quantity,
    partNumber,
    qrCode,
    customer,
    operators,
  }: ICreateOrder, callback?: () => void) => void;
  addBreakEnd: ({ orderNumber, _line }: IAddBreakEnd) => void;
  resumeOrder: () => ResumeOrderAction
  updateOrderOperators: (orderNumber: string, operators: ValidOperators, callback?: () => void) => void;
}

class Modal extends Component<IModalProps> {
  componentDidMount() {
      window.addEventListener("partnumberDeleted", () => {
        this.props.closeModal();
      });
  }

  handleActionClick = () => {
    const { modalAction } = this.props;
    switch (modalAction) {
      case "finish":
        this.handleFinishClick();
        break;

      case "delete":
        this.handleDeleteClick();
        break;

      case "delete redirection":
        this.handleDeleteRedirectionClick();
        break;

      case "delete product":
        this.handleDeleteProductClick();
        break;

      case "delete order":
        this.handleDeleteOrderFromStatsClick();
        break;

      case "delete partnumber":
        this.handleDeletePartnumberClick();
        break;

      case "delete operator":
        this.handleDeleteOperatorClick();
        break;

      case "accept operator":
        this.handleAcceptOperatorClick();
        break;

      case "resume operator":
        this.handleResumeOperatorClick();
        break;

      default:
        return;
    }
  };

  handleFinishClick = () => {
    const { orderNumber, closeOrder, closeModal } = this.props;
    closeOrder({ orderNumber });
    closeModal();
  };

  handleDeleteClick = () => {
    const { orderNumber, deleteOrder, closeModal } = this.props;
    deleteOrder({ orderNumber });
    closeModal();
  };

  handleDeleteOrderFromStatsClick = () => {
    const { orderNumberFromStats, deleteOrder, closeModal, callbackOnClose } =
      this.props;
    deleteOrder({ orderNumber: orderNumberFromStats });
    closeModal(callbackOnClose);
  };

  handleDeleteRedirectionClick = () => {
    const { redirectionId, deleteRedirection, closeModal } = this.props;
    deleteRedirection(redirectionId);
    closeModal();
  };

  handleDeleteProductClick = () => {
    const { productId, deleteProduct, closeModal } = this.props;
    deleteProduct(productId);
    closeModal();
  };

  handleDeletePartnumberClick = () => {
    const { partnumberId, deletePartnumber } = this.props;
    deletePartnumber(partnumberId);
  };

  handleDeleteOperatorClick = () => {
    const { operatorId, deleteOperator, closeModal } = this.props;
    deleteOperator(operatorId);
    closeModal();
  };

  createNewOrder(operators: ValidOperators, callback?: () => void) {
    if (this.props.menu) {
      const orders = this.props.menu.menuContent;

      const filteredOrders = orders.filter(
          (order) => order.orderNumber === this.props.orderNumber
      );

      const details = filteredOrders[0];

      const { orderNumber, quantity, partNumber, qrCode, customer, } = details;

      const orderInfo = {
        orderNumber,
        quantity,
        partNumber,
        qrCode,
        customer,
        operators,
      };

      this.props.createOrder(orderInfo, callback);
    }
  }

  handleAcceptOperatorClick = () => {
    const { operators, closeModal } = this.props;
    const hasAllOperators = operators?.every((operator) => operator.operator);

    if (hasAllOperators) {
      this.createNewOrder(operators, () => {
        closeModal();
      });
    }
  };

  endCurrentBreak() {
    const { orderNumber, _line, addBreakEnd, resumeOrder } = this.props;
    addBreakEnd({ orderNumber, _line });
    resumeOrder();
  }
  handleResumeOperatorClick = () => {
    const { orderNumber, operators, closeModal, updateOrderOperators } = this.props;
    const hasAllOperators = operators?.every((operator) => operator.operator);

    if (hasAllOperators && orderNumber) {
      updateOrderOperators(orderNumber, operators, () => {
          this.endCurrentBreak();
          closeModal();
      });
    }
  };

  handleCancelClick = () => {
    this.props.closeModal();
  };

  render() {
    const { isModalOpened, modalHeader, modalContent, modalAction, errorMessage } =
      this.props;
    return (
      <div
        className={`modal ${isModalOpened ? "modal--active" : ""}`}
        onClick={this.handleCancelClick}
      >
        <div className="modal__card" onClick={(e) => e.stopPropagation()}
             style={modalAction === 'accept operator' || modalAction === 'resume operator' ? {height: 'fit-content'} : {}}>
          <div className="modal__card__header">{modalHeader}</div>
          {modalAction === 'accept operator' || modalAction === 'resume operator' ? (
              <OperatorPicker />
          ) : (
              <>
              <div className="modal__card__content">{modalContent}</div>
              <div className="modal__card__error">{errorMessage}</div>
              </>
          )}
          <div className="modal__card__buttons">
            <button
              className={`btn ${
                modalAction === "finish" ? "btn--" + modalAction : "btn--delete"
              }`}
              onClick={this.handleActionClick}
              disabled={modalAction === 'accept operator' || modalAction === 'resume operator' ? !this.props.operators?.every((operator) => operator.operator) : false}
            >
              {modalAction === 'accept operator' || modalAction === 'resume operator' ? `${modalAction}` : `YES, ${modalAction}`}
            </button>
            <button
              className={`btn btn--cancel`}
              onClick={this.handleCancelClick}
            >
              {modalAction === 'accept operator' || modalAction === 'resume operator' ? `take me back` : `NO, take me back`}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    orderNumberFromStats: state.dashboard.orderDetails.orderNumber,
    isModalOpened: state.modal.isModalOpened,
    modalHeader: state.modal.modalHeader,
    modalContent: state.modal.modalContent,
    modalAction: state.modal.modalAction,
    redirectionId: state.modal.redirectionId,
    productId: state.modal.productId,
    partnumberId: state.modal.partnumberId,
    operatorId: state.modal.operatorId,
    callbackOnClose: state.modal.callbackOnClose,
    errorMessage: state.modal.errorMessage,
    operators: state.scanner.existingOrder?.operators || state.scanner.pickedOperators,
    menu: state.scanner.menu,
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
  };
}
export default connect(mapStateToProps, actions)(Modal);
