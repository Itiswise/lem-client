import {ActionTypes} from "../types";
import {OperatorsListType} from "../dashboardActions";
import {Dispatch} from "redux";
import axios from "axios";
import {headers, ROOT_URL} from "../../config";

export type GetScannerOperatorsAction = {
    type: ActionTypes.GET_SCANNER_OPERATORS_LIST;
    payload: OperatorsListType[];
}

export type GetScannerOperatorsActionError = {
    type: ActionTypes.GET_SCANNER_OPERATORS_LIST_ERROR;
    payload: string;
}

export const getScannerOperators = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(`${ROOT_URL}/api/operator`, {
            headers,
            params: {
                page: 1,
                limit: 200,
            },
        });
        dispatch<GetScannerOperatorsAction>({
            type: ActionTypes.GET_SCANNER_OPERATORS_LIST,
            payload: response.data.data,
        });
    } catch (e: any) {
        dispatch<GetScannerOperatorsActionError>({
            type: ActionTypes.GET_SCANNER_OPERATORS_LIST_ERROR,
            payload: e.response ? e.response.data.error : "server is not responding",
        });
    }
};