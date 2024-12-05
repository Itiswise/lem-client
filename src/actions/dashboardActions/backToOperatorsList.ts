import { ActionTypes } from "../../actions";

export type BackToOperatorsListAction = {
    type: ActionTypes.BACK_TO_OPERATORS_LIST;
};

export const backToOperatorsList = (): BackToOperatorsListAction => {
    return {
        type: ActionTypes.BACK_TO_OPERATORS_LIST,
    };
};