import axios from "axios";
import { Dispatch } from "redux";
import {ActionTypes, operatorsAttr} from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type UpdateOrderOperatorsAction = {
    type: ActionTypes.UPDATE_ORDER_OPERATORS;
    payload: [operatorsAttr, operatorsAttr, operatorsAttr];
};

export type UpdateOrderOperatorsActionError = {
    type: ActionTypes.UPDATE_ORDER_OPERATORS_ERROR;
    payload: string;
};

export const updateOrderOperators =
    (orderNumber: string, operators: [operatorsAttr, operatorsAttr, operatorsAttr], callback?: () => void) => {
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

