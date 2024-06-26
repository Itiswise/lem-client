import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import {ROOT_URL, headers, itemsPerPage} from "../../config";

export type PartnumberType = {
  _id: string;
  givenHourlyRate: number;
  suggestedHourlyRate: number;
  cleanRoomTime: number;
  givenTactTime: number;
  suggestedTactTime: number;
  xlsxTactTime: number;
  automatic: boolean;
  partNumber: string;
};

export type GetPartnumbersBeginAction = {
  type: ActionTypes.GET_PARTNUMBERS_BEGIN;
};

export type GetPartnumbersSuccessAction = {
  type: ActionTypes.GET_PARTNUMBERS_SUCCESS;
  payload: {
    partnumbers: PartnumberType[];
    allPartnumbersCount: number;
  };
};

export type GetPartnumbersActionError = {
  type: ActionTypes.GET_PARTNUMBERS_ERROR;
  payload: string;
};

export const getPartnumbers = (page?: number, search?: string) => async (dispatch: Dispatch) => {
  dispatch<GetPartnumbersBeginAction>({
    type: ActionTypes.GET_PARTNUMBERS_BEGIN,
  });
  try {
    const response = await axios.get(`${ROOT_URL}/api/product/statistics`, {
      headers,
      params: {
        limit: page ? itemsPerPage : 0,
        skip: page ? (page - 1) * itemsPerPage : 0,
        search: search,
      },
    });
    dispatch<GetPartnumbersSuccessAction>({
      type: ActionTypes.GET_PARTNUMBERS_SUCCESS,
      payload: response.data,
    });
  } catch (e: any) {
    dispatch<GetPartnumbersActionError>({
      type: ActionTypes.GET_PARTNUMBERS_ERROR,
      payload: e.response ? e.response.data.error : "server is not responding",
    });
  }
};
