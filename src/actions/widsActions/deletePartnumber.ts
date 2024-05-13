import axios from "axios";
import { Dispatch } from "redux";
import {ActionTypes, CloseModalAction} from "../../actions";
import { ROOT_URL, headers } from "../../config";

export type DeletePartnumberAction = {
  type: ActionTypes.DELETE_PARTNUMBER;
  payload?: string;
};

export type DeletePartnumberActionError = {
  type: ActionTypes.SET_MODAL_ERROR_MESSAGE;
  payload: string;
};

export const deletePartnumber =
  (partnumberId?: string) => async (dispatch: Dispatch) => {
    try {
      await axios.delete(`${ROOT_URL}/api/product/statistics/${partnumberId}`, {
        headers,
      });
      window.dispatchEvent(new Event("partnumberDeleted"));
      dispatch<DeletePartnumberAction>({
        type: ActionTypes.DELETE_PARTNUMBER,
        payload: partnumberId,
      });
    } catch (e: any) {
      dispatch<DeletePartnumberActionError>({
        type: ActionTypes.SET_MODAL_ERROR_MESSAGE,
        payload: e.response.data.error,
      });
    }
  };
