import { ActionTypes } from "../../actions";

export type SetModalErrorMessageAction = {
  type: ActionTypes.SET_MODAL_ERROR_MESSAGE;
  payload?: string;
};

export const setModalErrorMessage = (message: string): SetModalErrorMessageAction => {
  return { type: ActionTypes.SET_MODAL_ERROR_MESSAGE, payload: message};
};
