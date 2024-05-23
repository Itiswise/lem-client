import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, PartnumberType } from "..";
import { ROOT_URL, headers } from "../../config";

export type AddPartnumberAction = {
  type: ActionTypes.ADD_PARTNUMBER;
  payload: PartnumberType;
};

export type AddPartnumberActionError = {
  type: ActionTypes.ADD_PARTNUMBER_ERROR;
  payload: string;
};

export const addPartnumber =
  (
    { partNumber, givenHourlyRate, givenTactTime, cleanRoomTime }: PartnumberType
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `${ROOT_URL}/api/product/statistics`,
        {
          partNumber,
          givenHourlyRate,
          givenTactTime,
          cleanRoomTime,
        },
        {
          headers,
        }
      );
      dispatch<AddPartnumberAction>({
        type: ActionTypes.ADD_PARTNUMBER,
        payload: response.data,
      });
    } catch (e: any) {
      dispatch<AddPartnumberActionError>({
        type: ActionTypes.ADD_PARTNUMBER_ERROR,
        payload: e.response.data.error,
      });
    }
  };
