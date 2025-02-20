import { ActionTypes } from "..";

export type OpenDeleteOrderOperatorsModalAction = {
    type: ActionTypes.OPEN_DELETE_ORDER_OPERATORS_MODAL;
    payload: () => void;
};

export const openDeleteOrderOperatorsModal = (
    callbackOnClose: () => void
): OpenDeleteOrderOperatorsModalAction => {
    return {
        type: ActionTypes.OPEN_DELETE_ORDER_OPERATORS_MODAL,
        payload: callbackOnClose,
    };
};
