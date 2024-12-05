import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { OperatorsListType } from "../../../actions";
import { StoreState } from "../../../reducers";
import UserIcon from "../../icons/UserIcon";
import LineIcon from "../../icons/LineIcon";
import {IPosition} from "../../../utils/positions";

interface IOperatorPickerProps {
    errorMessage: string;
    initialValues: {
        operator: string | null;
    };
    orderNumber?: string | null;
    operator: string | null;
    position: IPosition;
    isPaused: boolean;
    operators: OperatorsListType[];
    positions: IPosition[];
    readerInputState: {
        isDisabled: boolean;
    };
    getScannerOperators: () => void;
    pickOperator: (operatorId: string) => void;
    pickPosition: (position: IPosition) => void;
}

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
    operator: string;
}

class OperatorPicker extends Component<
    InjectedFormProps<IFormProps> & IOperatorPickerProps
> {
    componentDidMount() {
        this.props.getScannerOperators();
    }

    handlePositionChange = (formProps: IFormProps) => {
        const currentPosition = this.props.position;
        const newPositionValue = formProps.target.value;

        if (currentPosition.value !== newPositionValue) {
            const newPosition = this.props.positions.find(
                (position) => position.value === newPositionValue
            );
            if (newPosition) {
                this.props.pickPosition(newPosition);
            }
        }
    }

    handleOperatorChange = (formProps: IFormProps) => {
        const currentOperatorId = this.props.initialValues.operator;
        const newOperatorId = formProps.target.value;

        if (currentOperatorId !== newOperatorId) {
            this.props.pickOperator(newOperatorId);
        }
    };

    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="alert__message">{this.props.errorMessage}</div>;
        }
    }

    renderPositionOptions() {
        if (this.props.positions) {
            return (
                <>
                    {this.props.positions.map((position) => (
                        <option
                            key={position.value}
                            value={position.value}
                            children={position.label}
                        />
                    ))}
                </>
            );
        }
    }

    renderOperatorOptions() {
        if (this.props.operators) {
            return (
                <>
                    {this.props.operators.map((operator) => (
                        <option
                            key={operator._id}
                            value={operator._id}
                            children={`${operator.firstname} ${operator.lastname} (${operator.email})`}
                        />
                    ))}
                </>
            );
        }
    }

    renderOperatorComponent() {
        const isReaderInputEnabled = !this.props.readerInputState.isDisabled;
        if (isReaderInputEnabled) {
            const filteredPosition = this.props.positions.filter(
                (position) => position.value === this.props.position.value
            );

            const filteredOperator = this.props.operators.filter(
                (operator) => operator._id === this.props.operator
            );

            return (
                <div className="chosen-line">
                    {filteredPosition[0] && `Stanowisko - ${filteredPosition[0].label}`}
                    {filteredOperator[0] && `Operator - ${filteredOperator[0].firstname} ${filteredOperator[0].lastname} (${filteredOperator[0].email})`}
                </div>
            );
        }

        return (
            <form>
                <fieldset style={{margin: '24px 0'}}>
                    <label className="line-picker__label" htmlFor="position">
                        <LineIcon /> Position
                    </label>
                    <Field
                        name="position"
                        type="text"
                        component="select"
                        className="line-picker__select"
                        onChange={this.handlePositionChange}
                        required
                        disabled={isReaderInputEnabled}
                    >
                        <option value="" children="Choose a position" />
                        {this.renderPositionOptions()}
                    </Field>
                </fieldset>
                <fieldset>
                    <label className="line-picker__label" htmlFor="operator">
                        <UserIcon /> Operator
                    </label>
                    <Field
                        name="operator"
                        type="text"
                        component="select"
                        className="line-picker__select"
                        onChange={this.handleOperatorChange}
                        required
                        disabled={isReaderInputEnabled}
                    >
                        <option value="" children="Choose an operator" />
                        {this.renderOperatorOptions()}
                    </Field>
                </fieldset>
            </form>
        );
    }

    render() {
        return <div>{this.renderOperatorComponent()}</div>;
    }
}

function mapStateToProps(state: StoreState) {
    return {
        errorMessage: state.auth.errorMessage,
        initialValues: { operator: '' },
        orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
        operator: state.scanner.pickedOperator,
        position: state.scanner.pickedPosition,
        enableReinitialize: true,
        isPaused: state.scanner.isPaused,
        operators: state.scanner.operators,
        positions: state.scanner.positions,
        readerInputState: state.scanner.readerInputState,
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: "operatorPicker" })
)(OperatorPicker) as ElementType;
