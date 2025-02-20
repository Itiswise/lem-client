import axios from "axios";
import { Dispatch } from "redux";
import {ActionTypes} from "../../actions";
import { ROOT_URL, headers } from "../../config";
import {ValidOperators} from "../../utils/operators";

export type DeleteOrderOperatorsAction = {
    type: ActionTypes.DELETE_ORDER_OPERATORS;
    payload: ValidOperators;
};

export type DeleteOrderOperatorsActionError = {
    type: ActionTypes.DELETE_ORDER_OPERATORS_ERROR;
    payload: string;
};

export const deleteOrderOperators =
    (orderNumber: string, operators: ValidOperators, callback?: () => void) => {
        return async (dispatch: Dispatch) => {
            try {
                const dashedordernumber = orderNumber.replace(/\//g, "-");
                const response = await axios.post(`${ROOT_URL}/api/order/${dashedordernumber}/delete-operators`,
                    { operators }, { headers });

                dispatch<DeleteOrderOperatorsAction>({
                    type: ActionTypes.DELETE_ORDER_OPERATORS,
                    payload: response.data.message || "Operators deleted successfully",
                });

                if (callback) {
                    callback();
                }
            } catch (e: any) {
                dispatch<DeleteOrderOperatorsActionError>(<DeleteOrderOperatorsActionError>{
                    type: ActionTypes.DELETE_ORDER_OPERATORS_ERROR,
                    payload: e.response.data.error || "Error deleting operators",
                });
            }
        };
    };

