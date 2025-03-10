import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "../../actions";
import { ROOT_URL, headers } from "../../config";
import {ValidOperators} from "../../utils/operators";

export type MenuDataType = {
  menuContent: {
    _id: string;
    orderNumber: string;
    quantity: number;
    customer: string;
    qrCode: string;
    partNumber: string;
    tactTime: number;
    operators?: ValidOperators;
  }[];
  timestamp: string;
  idCode: string;
};

export type GetMenuAction = {
  type: ActionTypes.GET_MENU;
  payload: MenuDataType;
};

export type GetMenuActionError = {
  type: ActionTypes.GET_MENU_ERROR;
  payload: string;
};

export const getMenu = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/menu`, {
      headers,
    });
    dispatch<GetMenuAction>({
      type: ActionTypes.GET_MENU,
      payload: response.data,
    });
  } catch (e: any) {
    dispatch<GetMenuActionError>({
      type: ActionTypes.GET_MENU_ERROR,
      payload: e.message,
    });
  }
};
