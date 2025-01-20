import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {OperatorsListType} from "../../../actions";
import { StoreState } from "../../../reducers";
import LineIcon from "../../icons/LineIcon";
import CloseIcon from "../../icons/CloseIcon";
import {ValidOperators} from "../../../utils/operators";
import OperatorIcon from "../../icons/OperatorIcon";

interface IOperatorPickerProps {
    errorMessage: string;
    orderNumber?: string | null;
    initialValues: ValidOperators;
    pickedOperators: ValidOperators;
    isPaused: boolean;
    operators: OperatorsListType[];
    readerInputState: {
        isDisabled: boolean;
    };
    getScannerOperators: (orderNumber: string) => void;
    pickOperators: (operators: ValidOperators) => void;
}

interface IFormProps extends React.ChangeEvent<HTMLInputElement> {
    pickedOperators: ValidOperators;
}

class OperatorPicker extends Component<
    InjectedFormProps<IFormProps> & IOperatorPickerProps
> {
    componentDidMount() {
        this.props.orderNumber && this.props.getScannerOperators(this.props.orderNumber);
    }

    handleOperatorChange = (formProps: IFormProps) => {
        const { pickedOperators } = this.props;
        const { value, name } = formProps.target;

        const updatedOperators = pickedOperators?.map((operator) => {
            if (`operator-${operator.position}` === name) {
                return { ...operator, operator: value };
            }
            return operator;
        }) as ValidOperators;

        this.props.pickOperators(updatedOperators);
    };

    handleAddOperator = () => {
        const { pickedOperators } = this.props;
        const position = pickedOperators.length + 1;
        const updatedOperators = [...pickedOperators, { position, operator: null }];

        this.props.pickOperators(updatedOperators);
    };

    handleRemoveOperator = (position: number) => {
        const { pickedOperators } = this.props;
        const updatedOperators = pickedOperators.filter((operator) => operator.position !== position).map((operator, index) => ({ ...operator, position: index + 1 }));

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
                            children={`${operator.firstname} (${operator.identifier})`}
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
                            <span><LineIcon/> {`Stanowisko ${index + 1}`}</span>
                        </label>
                        <label className="line-picker__label" htmlFor={`operator-${index + 1}`}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between', width: '100%'}}>
                                <span><OperatorIcon/> Operator</span>
                                {index > 0 && (
                                    <span
                                        style={{width: 20, height: 20, cursor: 'pointer'}}
                                        onClick={() => this.handleRemoveOperator(index + 1)}
                                    >
                                        <CloseIcon />
                                    </span>
                                )}
                            </div>
                            <Field
                                name={`operator-${index + 1}`}
                                type="text"
                                component="select"
                                className="line-picker__select"
                                onChange={this.handleOperatorChange}
                                required
                            >
                                <option value="" children="Choose an operator"/>
                                {this.renderOperatorOptions()}
                            </Field>
                        </label>
                    </fieldset>
                ))}
                <button
                    type="button"
                    className="btn"
                    style={{margin: '20px 0 0 auto', width: 'fit-content'}}
                    onClick={this.handleAddOperator}
                >
                    Add Operator
                </button>
            </form>
        );
    }

    render() {
        return <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
            {this.renderOperatorComponent()}
            {this.renderAlert()}
        </div>;
    }
}

function mapStateToProps(state: StoreState) {
    const initialValue = (index: number) => ({
        [`operator-${index + 1}`]: (state.scanner.pickedOperators && state.scanner.pickedOperators[index]?.operator) || '',
    });

    const initialValues = {};
    const length = state.scanner.pickedOperators.length || 1;

    for (let i = 0; i < length; i++) {
        Object.assign(initialValues, initialValue(i));
    }

    return {
        errorMessage: state.scanner.errorMessage,
        initialValues,
        orderNumber: state.scanner.pickedOrder || localStorage.getItem("order"),
        pickedOperators: state.scanner.pickedOperators.length ? state.scanner.pickedOperators : [{
            position: 1,
            operator: null
        }],
        enableReinitialize: true,
        isPaused: state.scanner.isPaused,
        operators: state.scanner.operators,
        readerInputState: state.scanner.readerInputState,
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: "operatorPicker" })
)(OperatorPicker) as ElementType;
