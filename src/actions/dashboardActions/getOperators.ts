import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "..";
import {ROOT_URL, headers, itemsPerPage} from "../../config";

export type OperatorsListType = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    __v: number;
};

export type GetOperatorsBeginAction = {
    type: ActionTypes.GET_OPERATORS_BEGIN;
};

export type GetOperatorsSuccessAction = {
    type: ActionTypes.GET_OPERATORS_SUCCESS;
    payload: {
        data: OperatorsListType[];
        pagination: {
            total: number;
            limit: number;
            page: number;
            totalPages: number;
        }
    };
};

export type GetOperatorsActionError = {
    type: ActionTypes.GET_OPERATORS_ERROR;
    payload: string;
};

export const getOperators = (page?: number) => async (dispatch: Dispatch) => {
    dispatch<GetOperatorsBeginAction>({
        type: ActionTypes.GET_OPERATORS_BEGIN,
    });
    try {
        const response = await axios.get(`${ROOT_URL}/api/operator`, {
            headers,
            params: {
                page: page || 1,
                limit: itemsPerPage,
            },
        });
        dispatch<GetOperatorsSuccessAction>({
            type: ActionTypes.GET_OPERATORS_SUCCESS,
            payload: response.data,
        });
    } catch (e: any) {
        dispatch<GetOperatorsActionError>({
            type: ActionTypes.GET_OPERATORS_ERROR,
            payload: e.response ? e.response.data.error : "server is not responding",
        });
    }
};
