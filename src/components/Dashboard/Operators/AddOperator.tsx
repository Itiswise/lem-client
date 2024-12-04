import React, { Component, ElementType } from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as actions from "../../../actions";
import { IAddOperator, AddOperatorAction, AddOperatorBeginAction, AddOperatorActionError } from "../../../actions";
import requireAuth from "../../requireAuth";
import { StoreState } from "../../../reducers";

interface IAddOperatorProps extends RouteComponentProps {
    errorMessage: string;
    addOperator: (
        formProps: IAddOperator,
    ) => AddOperatorAction | AddOperatorActionError | AddOperatorBeginAction;
    backToOperatorsList: () => void;
}

class AddOperator extends Component<InjectedFormProps<IAddOperator> & IAddOperatorProps> {
    onSubmit = (formProps: IAddOperator) => {
        const { addOperator } = this.props;
        addOperator(formProps);
    };

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div className="redirection-page">
                <div className="redirection-page__header">
                    <button
                        className="btn btn--finish btn--accent"
                        style={{ marginLeft: 'auto' }}
                        onClick={() => {
                            this.props.backToOperatorsList();
                        }}
                    >
                        {"<< back"}
                    </button>
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', paddingTop: '64px' }}>
                    <form className="add-user-form" onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <label className="add-user-form__label" htmlFor="firstname">
                                First name
                            </label>
                            <Field
                                className="add-user-form__select"
                                name="firstname"
                                type="text"
                                component="input"
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <label className="add-user-form__label" htmlFor="lastname">
                                Last name
                            </label>
                            <Field
                                className="add-user-form__select"
                                name="lastname"
                                type="text"
                                component="input"
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <label className="add-user-form__label" htmlFor="email">
                                Email
                            </label>
                            <Field
                                className="add-user-form__select"
                                name="email"
                                type="email"
                                component="input"
                                autoComplete="none"
                                required
                            />
                        </fieldset>
                        <div>{this.props.errorMessage}</div>

                        <button className="btn btn--accent spacer" disabled={submitting}>
                            Add Operator
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

interface IValidate {
    firstname?: string;
    lastname?: string;
    email?: string;
}

const validate: (values: IValidate) => IValidate = (values) => {
    const errors: IValidate = {};

    if (!values.firstname) {
        errors.firstname = "First name is required";
    } else if (!/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\-'\s]{3,50}$/.test(values.firstname)) {
        errors.firstname = "Invalid first name";
    }

    if (!values.lastname) {
        errors.lastname = "Last name is required";
    } else if (!/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\-'\s]{3,50}$/.test(values.lastname)) {
        errors.lastname = "Invalid last name";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    return errors;
};

function mapStateToProps(state: StoreState) {
    return { errorMessage: state.dashboard.errorMessage };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: "addOperator", validate: validate })
)(requireAuth(withRouter(AddOperator))) as ElementType;
