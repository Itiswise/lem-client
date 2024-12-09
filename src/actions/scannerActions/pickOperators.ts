import {ActionTypes, operatorsAttr} from "../../actions";

export type PickOperatorsAction = {
    type: ActionTypes.PICK_OPERATORS;
    payload: [operatorsAttr, operatorsAttr, operatorsAttr];
};

export const pickOperators =
    (operators: [operatorsAttr, operatorsAttr, operatorsAttr]): PickOperatorsAction => {
    return { type: ActionTypes.PICK_OPERATORS, payload: operators };
};
