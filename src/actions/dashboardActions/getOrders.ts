import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import {ROOT_URL, headers, itemsPerPage} from "../../config";

export type OrderListType = {
  orderNumber: string;
  _id: string;
  partNumber: string;
  orderStatus: string;
  quantity: number;
  orderAddedAt: string;
  lastValidScan: string;
  scansAlready: number;
  validScans: number;
  linesUsed: string;
};

export type GetOrdersBeginAction = {
  type: ActionTypes.GET_ORDERS_BEGIN;
};

export type GetOrdersSuccessAction = {
  type: ActionTypes.GET_ORDERS_SUCCESS;
  payload: {
    orders: OrderListType[];
    allOrdersCount: number;
  };
};

export type GetOrdersActionError = {
  type: ActionTypes.GET_ORDERS_ERROR;
  payload: string;
};

export const getOrders = (page?: number, filterObject?: Object, orderObject?: Object) => async (dispatch: Dispatch) => {
  dispatch<GetOrdersBeginAction>({
    type: ActionTypes.GET_ORDERS_BEGIN,
  });
  try {
    const response = await axios.get(`${ROOT_URL}/api/orders/stats`, {
      headers,
      params: {
        limit: page ? itemsPerPage : 0,
        skip: page ? (page - 1) * itemsPerPage : 0,
        ...filterObject,
        ...orderObject,
      },
    });
    dispatch<GetOrdersSuccessAction>({
      type: ActionTypes.GET_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (e: any) {
    dispatch<GetOrdersActionError>({
      type: ActionTypes.GET_ORDERS_ERROR,
      payload: e.response ? e.response.data.error : "server is not responding",
    });
  }
};
