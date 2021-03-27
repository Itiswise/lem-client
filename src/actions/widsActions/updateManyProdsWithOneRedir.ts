import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes, ProductType } from "../../actions";
import { ROOT_URL } from "../../config";

export interface IUpdateManyProdsWithOneRedir {
  redirectionId: string;
  productList: ProductType[];
}

export type UpdateManyProdsWithOneRedirAction = {
  type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR;
};

export type UpdateManyProdsWithOneRedirActionError = {
  type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR;
  payload: string;
};

export const updateManyProdsWithOneRedir = ({
  redirectionId,
  productList,
}: IUpdateManyProdsWithOneRedir) => async (dispatch: Dispatch) => {
  try {
    await axios.put(
      `${ROOT_URL}/api/product/redirection/${redirectionId}`,
      {
        productList,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch<UpdateManyProdsWithOneRedirAction>({
      type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR,
    });
  } catch (e) {
    dispatch<UpdateManyProdsWithOneRedirActionError>({
      type: ActionTypes.UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR,
      payload: e.response.data.error,
    });
  }
};
