import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {OperatorsListType} from "../../../actions";
import { StoreState } from "../../../reducers";
import LineIcon from "../../icons/LineIcon";
import {IPosition, operators as POSITIONS, ValidOperators} from "../../../utils/operators";
import OperatorIcon from "../../icons/OperatorIcon";

interface IOperatorPickerProps {
    errorMessage: string;
    initialValues: ValidOperators;
    orderNumber?: string | null;
    pickedOperators: ValidOperators;
    isPaused: boolean;
    operators: OperatorsListType[];
    positions: IPosition[];
    readerInputState: {
        isDisabled: boolean;
    };
    getScannerOperators: () => void;
    pickOperators: (operators: ValidOperators) => void;
}

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
    pickedOperators: ValidOperators;
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

        const updatedOperators = pickedOperators?.map((operator) => {
            if (operator.position === Number(name)) {
                return { ...operator, operator: value };
            }
            return operator;
        }) as ValidOperators;

        this.props.pickOperators(updatedOperators);
    };

    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="alert__message">{this.props.errorMessage}</div>;
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
        return (
            <form className="form">
                {this.props.pickedOperators && this.props.pickedOperators.map((item, index) => (
                    <fieldset key={index} className="form__group">
                        <label className="line-picker__label">
                            <span><LineIcon /> {POSITIONS[index].label}</span>
                        </label>
                        <label className="line-picker__label" htmlFor={`${POSITIONS[index].value}`}>
                            <span><OperatorIcon /> Operator</span>
                            <Field
                                name={`${POSITIONS[index].value}`}
                                type="text"
                                component="select"
                                className="line-picker__select"
                                onChange={this.handleOperatorChange}
                                required
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
        return <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {this.renderOperatorComponent()}
            {this.renderAlert()}
        </div>;
    }
}

function mapStateToProps(state: StoreState) {
    const initialValue = (index: number) => ({
        [POSITIONS[index].value]: (state.scanner.existingOrder?.operators &&
            state.scanner.existingOrder?.operators[index].operator) || (state.scanner.pickedOperators && state.scanner.pickedOperators[index].operator) || '',
    });

    const initialValues = {};

    for (let i = 0; i < POSITIONS.length; i++) {
        Object.assign(initialValues, initialValue(i));
    }

    return {
        errorMessage: state.scanner.errorMessage,
        initialValues,
        orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
        pickedOperators: state.scanner.pickedOperators,
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
