import { ActionTypes } from "../../actions";

export interface IOpenResumeOperatorModal {
    orderNumber: string;
}

export type OpenResumeOperatorModalAction = {
    type: ActionTypes.OPEN_RESUME_OPERATOR_MODAL;
    payload: string;
};

export const openResumeOperatorModal =
    ({
         orderNumber,
     }: IOpenResumeOperatorModal): OpenResumeOperatorModalAction => {
        return { type: ActionTypes.OPEN_RESUME_OPERATOR_MODAL, payload: orderNumber };
    };
