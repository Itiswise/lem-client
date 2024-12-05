import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type DeleteOperatorAction = {
    type: ActionTypes.DELETE_OPERATOR;
    payload?: string;
};

export type DeleteOperatorActionError = {
    type: ActionTypes.DELETE_OPERATOR_ERROR;
    payload: string;
};

export const deleteOperator =
    (operatorId?: string) => async (dispatch: Dispatch) => {
        try {
            await axios.delete(`${ROOT_URL}/api/operator/${operatorId}`, {
                headers,
            });
            dispatch<DeleteOperatorAction>({
                type: ActionTypes.DELETE_OPERATOR,
                payload: operatorId,
            });
        } catch (e: any) {
            dispatch<DeleteOperatorActionError>({
                type: ActionTypes.DELETE_OPERATOR_ERROR,
                payload: "Can not delete this operator",
            });
        }
    };
