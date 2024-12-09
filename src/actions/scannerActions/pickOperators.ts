import {ActionTypes} from "../../actions";
import {ValidOperators} from "../../utils/operators";

export type PickOperatorsAction = {
    type: ActionTypes.PICK_OPERATORS;
    payload: ValidOperators;
};

export const pickOperators =
    (operators: ValidOperators): PickOperatorsAction => {
    return { type: ActionTypes.PICK_OPERATORS, payload: operators };
};
