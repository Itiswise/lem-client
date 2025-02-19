import { ActionTypes } from "../../actions";

export interface IOpenOperatorModal {
    orderNumber: string;
}

export type OpenOperatorModalAction = {
    type: ActionTypes.OPEN_OPERATOR_MODAL;
    payload: string;
};

export const openOperatorModal =
    ({
         orderNumber,
     }: IOpenOperatorModal): OpenOperatorModalAction => {
    return { type: ActionTypes.OPEN_OPERATOR_MODAL, payload: orderNumber };
};
