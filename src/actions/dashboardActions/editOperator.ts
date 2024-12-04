import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export interface IEditOperator {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
}

export type EditOperatorBeginAction = {
    type: ActionTypes.EDIT_OPERATOR_BEGIN;
};

export type EditOperatorAction = {
    type: ActionTypes.EDIT_OPERATOR;
    payload: EditedOperator;
};

export type EditedOperator = {
    existingOperator: {
        _id: string;
        firstname: string;
        lastname: string;
        email: string;
        __v: number;
    }
};

export type EditOperatorActionError = {
    type: ActionTypes.EDIT_OPERATOR_ERROR;
    payload: string;
};

export const editOperator =
    (
        { _id, firstname, lastname, email }: IEditOperator,
    ) =>
        async (dispatch: Dispatch) => {
            dispatch<EditOperatorBeginAction>({
                type: ActionTypes.EDIT_OPERATOR_BEGIN,
            });
            try {
                const response: any = await axios.put<EditedOperator>(
                    `${ROOT_URL}/api/operator/${_id}`,
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
                    dispatch<EditOperatorActionError>({
                        type: ActionTypes.EDIT_OPERATOR_ERROR,
                        payload: response.data.error,
                    });
                    return;
                }

                dispatch<EditOperatorAction>({
                    type: ActionTypes.EDIT_OPERATOR,
                    payload: response.data,
                });

            } catch (e: any) {
                dispatch<EditOperatorActionError>({
                    type: ActionTypes.EDIT_OPERATOR_ERROR,
                    payload: e.response.data.error,
                });
            }
        };
