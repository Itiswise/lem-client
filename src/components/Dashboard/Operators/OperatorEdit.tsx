import React, { Component, ElementType, FC } from "react";
import { reduxForm, Field, InjectedFormProps, WrappedFieldProps } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as actions from "../../../actions";
import { IEditOperator, EditOperatorAction, EditOperatorBeginAction, EditOperatorActionError, OperatorsListType } from "../../../actions";
import requireAuth from "../../requireAuth";
import { StoreState } from "../../../reducers";

interface RenderFieldProps {
    label: string;
    type: string;
    htmlFor?: string;
    required?: boolean;
    autoComplete?: string;
}

const renderField:FC<RenderFieldProps & WrappedFieldProps> =
    ({
         input,
         label,
         type,
         htmlFor,
         required,
         autoComplete,
         meta: { touched, error, warning }
     }) => (
        <fieldset>
            <label className="add-user-form__label" htmlFor={htmlFor}>{label}</label>
            <input className="add-user-form__select" {...input} placeholder={label} type={type} required={required} autoComplete={autoComplete}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </fieldset>
    )

interface IEditOperatorProps extends RouteComponentProps {
    errorMessage: string;
    initialValues: OperatorsListType,
    editOperator: (
        formProps: IEditOperator,
    ) => EditOperatorAction | EditOperatorActionError | EditOperatorBeginAction;
    backToOperatorsList: () => void;
}

class OperatorEdit extends Component<InjectedFormProps<IEditOperator> & IEditOperatorProps> {
    onSubmit = (formProps: IEditOperator) => {
        const { editOperator } = this.props;
        editOperator(formProps);
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
                        <Field
                            htmlFor="firstname"
                            name="firstname"
                            type="text"
                            label="First name"
                            component={renderField}
                            required
                        />
                        <Field
                            htmlFor="lastname"
                            name="lastname"
                            type="text"
                            label="Last name"
                            component={renderField}
                            required
                        />
                        <Field
                            htmlFor="identifier"
                            name="identifier"
                            type="text"
                            label="Identifier"
                            component={renderField}
                            required
                            autoComplete="none"
                        />
                        <div style={{ padding: '24px 0' }}>{this.props.errorMessage}</div>
                        <button className="btn btn--accent" disabled={submitting}>
                            Save Changes
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
    return {
        errorMessage: state.dashboard.errorMessage,
        initialValues: state.dashboard.operatorDetails,
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: "editOperator", validate })
)(requireAuth(withRouter(OperatorEdit))) as ElementType;
