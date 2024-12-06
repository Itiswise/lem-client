import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {operatorsAttr, OperatorsListType} from "../../../actions";
import { StoreState } from "../../../reducers";
import UserIcon from "../../icons/UserIcon";
import LineIcon from "../../icons/LineIcon";
import {IPosition, positions as POSITIONS} from "../../../utils/positions";

interface IOperatorPickerProps {
    errorMessage: string;
    initialValues: [operatorsAttr, operatorsAttr, operatorsAttr];
    orderNumber?: string | null;
    pickedOperators: [operatorsAttr, operatorsAttr, operatorsAttr];
    isPaused: boolean;
    operators: OperatorsListType[];
    positions: IPosition[];
    readerInputState: {
        isDisabled: boolean;
    };
    getScannerOperators: () => void;
    pickOperators: (operators: [operatorsAttr, operatorsAttr, operatorsAttr]) => void;
}

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
    pickedOperators: [operatorsAttr, operatorsAttr, operatorsAttr];
}

class OperatorPicker extends Component<
    InjectedFormProps<IFormProps> & IOperatorPickerProps
> {
    componentDidMount() {
        this.props.getScannerOperators();
    }

    handleOperatorChange = (formProps: IFormProps) => {
        const { pickedOperators } = this.props;
        const { value, name } = formProps.target;

        const updatedOperators = pickedOperators.map((operator) => {
            if (operator.position === name) {
                return { ...operator, operator: value };
            }
            return operator;
        }) as [operatorsAttr, operatorsAttr, operatorsAttr];

        console.log(updatedOperators);

        this.props.pickOperators(updatedOperators);
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
        // if (isReaderInputEnabled) {
        //     const filteredPosition = this.props.positions.filter(
        //         (position) => position.value === this.props.position.value
        //     );
        //
        //     const filteredOperator = this.props.operators.filter(
        //         (operator) => operator._id === this.props.operator
        //     );
        //
        //     return (
        //         <div className="chosen-line">
        //             {filteredPosition[0] && `Stanowisko - ${filteredPosition[0].label}`}
        //             {filteredOperator[0] && `Operator - ${filteredOperator[0].firstname} ${filteredOperator[0].lastname} (${filteredOperator[0].email})`}
        //         </div>
        //     );
        // }

        return (
            <form className="form">
                {this.props.pickedOperators && this.props.pickedOperators.map((item, index) => (
                    <fieldset key={index} className="form__group">
                        <label className="line-picker__label">
                            <span><LineIcon /> {POSITIONS[index].value}</span>
                        </label>
                        <label className="line-picker__label" htmlFor={POSITIONS[index].value}>
                            <span><UserIcon /> Operator</span>
                            <Field
                                name={POSITIONS[index].value}
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
                        </label>
                    </fieldset>
                ))}
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
        initialValues: {
            [POSITIONS[0].value]: (state.scanner.existingOrder?.operators &&
                state.scanner.existingOrder?.operators[0].operator) || state.scanner.pickedOperators[0].operator || '',
            [POSITIONS[1].value]: (state.scanner.existingOrder?.operators &&
                state.scanner.existingOrder?.operators[1].operator) || state.scanner.pickedOperators[1].operator || '',
            [POSITIONS[2].value]: (state.scanner.existingOrder?.operators &&
                state.scanner.existingOrder?.operators[2].operator) || state.scanner.pickedOperators[2].operator || '',
        },
        orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
        pickedOperators: state.scanner.existingOrder?.operators || state.scanner.pickedOperators,
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
