import { ActionTypes } from "../../actions";

export interface IPickOperator {
    operatorId: string;
}

export type PickOperatorAction = {
    type: ActionTypes.PICK_OPERATOR;
    payload: string;
};

export const pickOperator =
    ({ operatorId }: IPickOperator): PickOperatorAction => {
    return { type: ActionTypes.PICK_OPERATOR, payload: operatorId };
};
