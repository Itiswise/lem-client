import { ActionTypes } from "../../actions";

export type StartAddingOperatorAction = {
    type: ActionTypes.START_ADDING_OPERATOR;
};

export const startAddingOperator = (): StartAddingOperatorAction => {
    return {
        type: ActionTypes.START_ADDING_OPERATOR,
    };
};
