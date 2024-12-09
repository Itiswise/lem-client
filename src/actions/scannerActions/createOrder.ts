import axios from "axios";
import {Dispatch} from "redux";
import {ActionTypes} from "../../actions";
import {headers, ROOT_URL} from "../../config";

export interface operatorsAttr {
  position: 'Position 1' | 'Position 2' | 'Position 3';
  operator: string | null;
}

export interface ICreateOrder {
  orderNumber: string;
  quantity: number;
  partNumber: string;
  qrCode: string;
  customer: string;
  orderStatus?: string;
  orderAddedAt?: string;
  operators?: [operatorsAttr, operatorsAttr, operatorsAttr];
}

export type OrderType = {
  _id: string;
  orderNumber?: string;
  quantity?: number;
  partNumber?: string;
  qrCode?: string;
  tactTime?: number;
  customer?: string;
  orderStatus?: string;
  orderAddedAt?: string;
  breaks?: {
    _id?: string;
    _line?: string;
    breakStart?: string;
    breakEnd?: string;
  }[];
  scans?: {
    _id?: string;
    timeStamp?: string;
    errorCode?: string;
    scanContent?: string;
    operators?: [operatorsAttr, operatorsAttr, operatorsAttr];
    _line?: string;
    _user?: string;
  }[];
  operators?: [operatorsAttr, operatorsAttr, operatorsAttr];
};

export type CreateOrderAction = {
  type: ActionTypes.CREATE_ORDER;
  payload: { order: OrderType };
};

export type CreateOrderActionError = {
  type: ActionTypes.CREATE_ORDER_ERROR;
  payload: string;
};

export const createOrder =
    ({orderNumber, quantity, partNumber, qrCode, customer, operators}: ICreateOrder, callback?: () => void) =>
  async (dispatch: Dispatch) => {
    try {
      const resp = await axios.post(
        `${ROOT_URL}/api/product/tt`,
        {
          partNumber,
        },
        {
          headers,
        }
      );

      const tactTime = resp.data.givenTactTime;
      console.log({ tactTime });
      const response = await axios.post(
        `${ROOT_URL}/api/order`,
        {
          orderNumber,
          quantity,
          partNumber,
          qrCode,
          tactTime,
          customer,
          operators,
        },
        {
          headers,
        }
      );
      dispatch<CreateOrderAction>({
        type: ActionTypes.CREATE_ORDER,
        payload: response.data,
      });

      if (callback) {
        callback();
      }
    } catch (e: any) {
      dispatch<CreateOrderActionError>({
        type: ActionTypes.CREATE_ORDER_ERROR,
        payload: "Can not create this order - incomplete or wrong information",
      });
    }
  };
