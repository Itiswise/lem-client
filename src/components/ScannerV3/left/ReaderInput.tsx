import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  OrderType,
  MenuDataType,
  EnableReaderInputAction,
  DisableReaderInputAction,
  IInsertScan,
  IAddBreakStart,
  ICloseOrder,
  PauseOrderAction,
  PartnumberConfigType,
} from "../../../actions";
import { StoreState } from "../../../reducers";
import ScannerIcon from "../../icons/ScannerIcon";
import "./ReaderInputStyle.scss";
import {scanOperatorsAttr, ValidScanOperators} from "../../../utils/operators";

interface IReaderInputProps {
  errorMessage: string;
  existingOrder: OrderType;
  userId: string;
  orderNumber: string;
  _line: string;
  isOrderedQuantityMatchesValidScansQuantity: boolean;
  menu: MenuDataType;
  isPaused: boolean;
  isRunning: boolean;
  readerInputState: {
    isDisabled: boolean;
  };
  disableReaderInput: () => DisableReaderInputAction;
  enableReaderInput: () => EnableReaderInputAction;
  getPartnumberConfig: () => void;
  partnumberConfig: PartnumberConfigType;
  insertScan: ({ scanContent, _line, _user, orderNumber, operators }: IInsertScan) => void;
  addBreakStart: ({ orderNumber, _line }: IAddBreakStart) => void;
  closeOrder: ({ orderNumber }: ICloseOrder) => void;
  pauseOrder: () => PauseOrderAction;
}

interface IFormProps {
  scanContent: string;
}

class ReaderInput extends Component<
  InjectedFormProps<IFormProps> & IReaderInputProps
> {
  componentDidUpdate(prevProps: IReaderInputProps) {
    const htmlInput = document.querySelector("input");
    if (htmlInput) {
      htmlInput.focus();
    }

    if (this.props.existingOrder) {
      if (this.props.existingOrder !== prevProps.existingOrder) {
        if (this.props.existingOrder.orderStatus !== "closed") {
        }
        if (!this.props.existingOrder) {
          this.props.disableReaderInput();
        } else if (this.props.isRunning) {
          this.props.enableReaderInput();
        } else {
          this.props.disableReaderInput();
        }
      }
    }
  }

  onSubmit = (formProps: IFormProps) => {
    const { scanContent } = formProps;
    const {
      orderNumber,
      _line,
      userId,
      insertScan,
      reset,
      getPartnumberConfig,
      existingOrder,
    } = this.props;

    const operators = existingOrder?.operators?.map((operator): scanOperatorsAttr => ({
      position: operator.position,
      firstName: operator.firstName,
      lastName: operator.lastName,
      identifier: operator.identifier,
    })) as ValidScanOperators;

    insertScan({
      scanContent,
      _line,
      _user: userId,
      orderNumber,
      operators,
    });
    reset();
    getPartnumberConfig();
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="alert-v3__message">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit, readerInputState } = this.props;
    const { isDisabled } = readerInputState;
    return (
      <div className="reader-v3">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label
              className={`reader-v3__label ${
                isDisabled ? "reader-v3__label--disabled" : ""
              }`}
              htmlFor="scanContent"
            >
              <ScannerIcon />
            </label>
            <Field
              name="scanContent"
              type="text"
              id="scanContent"
              component="input"
              autoComplete="none"
              required
              disabled={isDisabled}
              autoFocus
              className="reader-v3__input"
            />
          </fieldset>
          <div className="alert-v3">{this.renderAlert()}</div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    errorMessage: state.scanner.errorMessage,
    existingOrder: state.scanner.existingOrder,
    userId: state.scanner.userId,
    orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
    _line: state.scanner.pickedLine || localStorage.getItem("line"),
    isOrderedQuantityMatchesValidScansQuantity:
      state.scanner.isOrderedQuantityMatchesValidScansQuantity,
    enableReinitialize: true,
    menu: state.scanner.menu,
    isPaused: state.scanner.isPaused,
    isRunning: state.scanner.isRunning,
    readerInputState: state.scanner.readerInputState,
    partnumberConfig: state.dashboard.partnumberConfig,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "readerInput" })
)(ReaderInput) as ElementType;
