import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";

export interface IPickLine {
  currentLineId: string;
  newLineId: string;
  userName: string;
}

export type ClearPickedOrderAction = {
    type: ActionTypes.CLEAR_PICKED_ORDER;
}

export type PickLineAction = {
  type: ActionTypes.PICK_LINE;
  payload: string;
};

export type PickLineActionError = {
  type: ActionTypes.PICK_LINE_ERROR;
  payload: string;
};

export const pickLine =
  ({ currentLineId, newLineId, userName }: IPickLine) =>
  async (dispatch: Dispatch) => {
    dispatch<ClearPickedOrderAction>({
        type: ActionTypes.CLEAR_PICKED_ORDER,
    });
    try {
      await axios.put(
        `${ROOT_URL}/api/line/status`,
        {
          lineId: currentLineId || newLineId,
          lineStatus: "free",
        },
        {
          headers,
        }
      );
      await axios.put(
        `${ROOT_URL}/api/line/status`,
        {
          lineId: newLineId,
          lineStatus: userName,
        },
        {
          headers,
        }
      );
      dispatch<PickLineAction>({
        type: ActionTypes.PICK_LINE,
        payload: newLineId,
      });
      localStorage.setItem("line", newLineId);
    } catch (e: any) {
      dispatch<PickLineActionError>({
        type: ActionTypes.PICK_LINE_ERROR,
        payload: e.message,
      });
    }
  };
