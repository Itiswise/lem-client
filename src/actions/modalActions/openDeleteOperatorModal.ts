import { ActionTypes } from "../../actions";

export interface IOpenDeleteOperatorModal {
    _id: string;
}

export type OpenDeleteOperatorModalAction = {
    type: ActionTypes.OPEN_DELETE_OPERATOR_MODAL;
    payload: string;
};

export const openDeleteOperatorModal = ({
                                           _id,
                                       }: IOpenDeleteOperatorModal): OpenDeleteOperatorModalAction => {
    return { type: ActionTypes.OPEN_DELETE_OPERATOR_MODAL, payload: _id };
};
