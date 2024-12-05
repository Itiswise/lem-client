import { ModalAction, ActionTypes } from "../actions";

export interface IModalState {
  isModalOpened?: boolean;
  modalHeader?: string;
  modalContent?: string;
  modalAction?:
    | "finish"
    | "delete"
    | "delete redirection"
    | "delete product"
    | "delete order"
    | "delete partnumber"
    | "delete operator"
    | "";
  redirectionId?: string;
  productId?: string;
  partnumberId?: string;
  operatorId?: string;
  callbackOnClose?: () => void;
  errorMessage?: string;
}

const MODAL_INITIAL_STATE: IModalState = {
  isModalOpened: false,
  modalHeader: "",
  modalContent: "",
  modalAction: "",
  redirectionId: "",
  productId: "",
  partnumberId: "",
  operatorId: "",
  errorMessage: "",
};

export const modalReducer = (
  state = MODAL_INITIAL_STATE,
  action: ModalAction
) => {
  switch (action.type) {
    case ActionTypes.OPEN_FINISH_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to finish/close this order?",
        modalContent: `finished/closed orders cannot be re-opened!

        if you want to add some scans into this order - use “PAUSE”
        instead
        of “finish”`,
        modalAction: "finish",
      };

    case ActionTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpened: false,
        modalHeader: "",
        modalContent: "",
        modalAction: "",
        errorMessage: "",
      };

    case ActionTypes.OPEN_DELETE_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this order?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
           smash the “YES…” button`,
        modalAction: "delete",
      };

    case ActionTypes.OPEN_DELETE_ORDER_FROM_STATS_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this order?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
             smash the “YES…” button`,
        modalAction: "delete order",
        callbackOnClose: action.payload,
      };

    case ActionTypes.OPEN_DELETE_REDIRECTION_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this redirection?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
               smash the “YES…” button`,
        modalAction: "delete redirection",
        redirectionId: action.payload,
      };

    case ActionTypes.OPEN_DELETE_PRODUCT_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this product?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
                 smash the “YES…” button`,
        modalAction: "delete product",
        productId: action.payload,
      };

    case ActionTypes.OPEN_DELETE_PARTNUMBER_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this partnumber?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
                 smash the “YES…” button`,
        modalAction: "delete partnumber",
        partnumberId: action.payload,
      };

    case ActionTypes.OPEN_DELETE_OPERATOR_MODAL:
      return {
        ...state,
        isModalOpened: true,
        modalHeader: "Are you sure you want to delete this operator?",
        modalContent: `It can't be undone! So, if you are really 100% sure,
                 smash the “YES…” button`,
        modalAction: "delete operator",
        operatorId: action.payload,
      };

    case ActionTypes.SET_MODAL_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
