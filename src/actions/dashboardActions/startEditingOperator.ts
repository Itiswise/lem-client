import { ActionTypes, OperatorsListType } from "..";

export type StartEditingOperatorAction = {
    type: ActionTypes.START_EDITING_OPERATOR;
    payload: OperatorsListType;
};

export const startEditingOperator = (
    initialData: OperatorsListType
): StartEditingOperatorAction => {
    return {
        type: ActionTypes.START_EDITING_OPERATOR,
        payload: initialData,
    };
};
