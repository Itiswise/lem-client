import { ActionTypes } from "../../actions";

export interface IOpenDeletePartnumberModal {
  _id: string;
}

export type OpenDeletePartnumberModalAction = {
  type: ActionTypes.OPEN_DELETE_PARTNUMBER_MODAL;
  payload: string;
};

export const openDeletePartnumberModal = ({
  _id,
}: IOpenDeletePartnumberModal): OpenDeletePartnumberModalAction => {
  return { type: ActionTypes.OPEN_DELETE_PARTNUMBER_MODAL, payload: _id };
};
