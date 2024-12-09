import axios from "axios";
import { Dispatch } from "redux";
import {ActionTypes} from "../../actions";
import { ROOT_URL, headers } from "../../config";
import {ValidOperators} from "../../utils/operators";

export type UpdateOrderOperatorsAction = {
    type: ActionTypes.UPDATE_ORDER_OPERATORS;
    payload: ValidOperators;
};

export type UpdateOrderOperatorsActionError = {
    type: ActionTypes.UPDATE_ORDER_OPERATORS_ERROR;
    payload: string;
};

export const updateOrderOperators =
    (orderNumber: string, operators: ValidOperators, callback?: () => void) => {
    return async (dispatch: Dispatch) => {
        try {
            const dashedordernumber = orderNumber.replace(/\//g, "-");
            const response = await axios.put(`${ROOT_URL}/api/order/${dashedordernumber}/operators`,
                { operators }, { headers });
            dispatch<UpdateOrderOperatorsAction>({
                type: ActionTypes.UPDATE_ORDER_OPERATORS,
                payload: response.data.existingOrder.operators
            });

            if (callback) {
                callback();
            }
        } catch (e: any) {
            dispatch<UpdateOrderOperatorsActionError>({
                type: ActionTypes.UPDATE_ORDER_OPERATORS_ERROR,
                payload: "Error updating operators - please check if there's no duplicates!"
            });
        }
    };
};

