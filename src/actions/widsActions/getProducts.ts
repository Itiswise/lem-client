import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType } from "../../actions";
import { ROOT_URL, headers } from "../../config";
import { itemsPerPage } from "../../config";

export type GetProductsAction = {
  type: ActionTypes.GET_PRODUCTS;
  payload: {
    products: ProductType[];
    allProductsCount: number;
  };
};

export type GetProductsActionError = {
  type: ActionTypes.GET_PRODUCTS_ERROR;
  payload: string;
};

export const getProducts = (page?: number, search?: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/api/product`, {
      headers,
      params: {
          limit: page ? itemsPerPage : 0,
          skip: page ? (page - 1) * itemsPerPage : 0,
          search: search,
      },
    });
    dispatch<GetProductsAction>({
      type: ActionTypes.GET_PRODUCTS,
      payload: response.data,
    });
  } catch (e: any) {
    dispatch<GetProductsActionError>({
      type: ActionTypes.GET_PRODUCTS_ERROR,
      payload: e.response ? e.response.data.error : "server is not responding",
    });
  }
};
