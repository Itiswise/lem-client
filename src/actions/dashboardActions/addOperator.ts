import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export interface IAddOperator {
    firstname: string;
    lastname: string;
    email: string;
}

export type AddOperatorBeginAction = {
    type: ActionTypes.ADD_OPERATOR_BEGIN;
};

export type AddOperatorAction = {
    type: ActionTypes.ADD_OPERATOR;
    payload: NewOperator;
};

export type NewOperator = {
    operatorFirstName: string;
    operatorLastName: string;
    operatorId: string;
};

export type AddOperatorActionError = {
    type: ActionTypes.ADD_OPERATOR_ERROR;
    payload: string;
};

export const addOperator =
    (
        { firstname, lastname, email }: IAddOperator,
    ) =>
        async (dispatch: Dispatch) => {
            dispatch<AddOperatorBeginAction>({
                type: ActionTypes.ADD_OPERATOR_BEGIN,
            });
            try {
                const response: any = await axios.post<NewOperator>(
                    `${ROOT_URL}/api/operator`,
                    {
                        firstname,
                        lastname,
                        email,
                    },
                    {
                        headers,
                    }
                );

                if (response.data.error) {
                    dispatch<AddOperatorActionError>({
                        type: ActionTypes.ADD_OPERATOR_ERROR,
                        payload: response.data.error,
                    });
                    return;
                }

                dispatch<AddOperatorAction>({
                    type: ActionTypes.ADD_OPERATOR,
                    payload: response.data,
                });

            } catch (e: any) {
                dispatch<AddOperatorActionError>({
                    type: ActionTypes.ADD_OPERATOR_ERROR,
                    payload: e.response.data.error,
                });
            }
        };
