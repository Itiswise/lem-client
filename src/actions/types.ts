import {
  SigninAction,
  SigninActionError,
  SignoutAction,
  AddUserAction,
  AddUserActionError,
} from "./authActions";

import {
  FetchMessageAction,
  InsertScanAction,
  InsertScanActionError,
  GetOrderAction,
  GetOrderActionError,
  GetLinesAction,
  GetLinesActionError,
  PickLineAction,
  PickLineActionError,
  FreeLineAction,
  FreeLineActionError,
  OccupyLineWithOrderAction,
  OccupyLineWithOrderActionError,
  GetMenuAction,
  GetMenuActionError,
  PickOrderAction,
  PickOrderActionError,
  CreateOrderAction,
  CreateOrderActionError,
  CloseOrderAction,
  CloseOrderActionError,
  DeleteOrderAction,
  DeleteOrderActionError,
  EnableReaderInputAction,
  DisableReaderInputAction,
  AddBreakStartAction,
  AddBreakStartActionError,
  AddBreakEndAction,
  AddBreakEndActionError,
  PauseOrderAction,
  ResumeOrderAction,
  SetOrderPauseStatusAction,
} from "./scannerActions";

import {
  OpenFinishModalAction,
  CloseModalAction,
  OpenDeleteModalAction,
  OpenDeleteRedirectionModalAction,
  OpenDeleteProductModalAction,
  OpenDeleteOrderFromStatsModalAction,
  OpenDeletePartnumberModalAction,
  SetModalErrorMessageAction,
} from "./modalActions";

import {
  ChooseSidebarTabAction,
  InitLiveDataAction,
  InitLiveDataActionError,
  RefreshLiveDataAction,
  GetOrdersBeginAction,
  GetOrdersSuccessAction,
  GetOrdersActionError,
  GetOrderDetailsBeginAction,
  GetOrderDetailsSuccessAction,
  GetOrderDetailsActionError,
  ViewOrderDetailsAction,
  BackToOrdersListAction,
  GetPartnumbersBeginAction,
  GetPartnumbersSuccessAction,
  GetPartnumbersActionError,
  GetPartnumberDetailsBeginAction,
  GetPartnumberDetailsSuccessAction,
  GetPartnumberDetailsActionError,
  UpdatePartnumbersListAction,
  GetPartnumberConfigAction,
  GetPartnumberConfigActionError,
  ConfigurePartnumbersAction,
  SavePartnumberConfigAction,
  SavePartnumberConfigActionError,
  SavePartnumberAction,
  SavePartnumberActionError,
  StartEditingPartnumberAction,
  UpdateGivenHourlyRateAction,
  UpdateGivenTactTimeAction,
  BackToPartnumbersListAction,
  BackToUsersListAction,
  ChangePasswordAction,
  ChangePasswordActionError,
  GetUsersBeginAction,
  GetUsersSuccessAction,
  GetUsersActionError,
  StartAddingUserAction,
  StartChangingPasswordAction,
  AddPartnumberAction,
  AddPartnumberActionError,
  GetOperatorsBeginAction,
  GetOperatorsSuccessAction,
  GetOperatorsActionError,
  BackToOperatorsListAction,
  StartAddingOperatorAction,
  AddOperatorBeginAction,
  AddOperatorAction,
  AddOperatorActionError,
} from "./dashboardActions";

import {
  GetRedirectionsAction,
  GetRedirectionsActionError,
  StartEditingRedirectionAction,
  AddProductsToRedirectionAction,
  StartAddingProductsToRedirectionAction,
  StartAddingProductsToRedirectionActionError,
  AddRedirectionAction,
  AddRedirectionActionError,
  StartAddingRedirectionAction,
  SaveRedirectionAction,
  SaveRedirectionActionError,
  DeleteRedirectionAction,
  DeleteRedirectionActionError,
  BackToRedirectionsListAction,
  GetProductsAction,
  GetProductsActionError,
  UpdateProductsListAction,
  StartEditingProductAction,
  StartAddingProductAction,
  DeleteProductAction,
  DeleteProductActionError,
  BackToProductsListAction,
  AddProductAction,
  AddProductActionError,
  GetProductBeginAction,
  GetProductSuccessAction,
  GetProductActionError,
  AddLinkInProductAction,
  AddLinkInProductActionError,
  AddRedirectionInProductAction,
  AddRedirectionInProductActionError,
  DeleteConnectedLinkItemAction,
  DeleteConnectedLinkItemActionError,
  DeleteConnectedRedirectionItemAction,
  DeleteConnectedRedirectionItemActionError,
  SetMessageAction,
  SendProductsAction,
  UpdateManyProdsWithOneRedirAction,
  UpdateManyProdsWithOneRedirActionError,
  DeletePartnumberAction,
  DeletePartnumberActionError,
} from "./widsActions";
import {StartAddingPartnumberAction} from "./dashboardActions/startAddingPartnumber";

export const UPDATE_MANY_PRODS_WITH_ONE_REDIR =
  "update_many_prods_with_one_redir";
export const UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR =
  "update_many_prods_with_one_redir_error";

export enum ActionTypes {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  INSERT_SCAN,
  INSERT_SCAN_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_LINES,
  GET_LINES_ERROR,
  PICK_LINE,
  PICK_LINE_ERROR,
  OCCUPY_LINE_WITH_ORDER,
  OCCUPY_LINE_WITH_ORDER_ERROR,
  GET_MENU,
  GET_MENU_ERROR,
  PICK_ORDER,
  PICK_ORDER_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CLOSE_ORDER,
  CLOSE_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_ERROR,
  ENABLE_READER_INPUT,
  DISABLE_READER_INPUT,
  ADD_BREAK_START,
  ADD_BREAK_START_ERROR,
  ADD_BREAK_END,
  ADD_BREAK_END_ERROR,
  SET_ORDER_PAUSE_STATUS,
  PAUSE_ORDER,
  RESUME_ORDER,
  OPEN_FINISH_MODAL,
  CLOSE_MODAL,
  OPEN_DELETE_MODAL,
  OPEN_DELETE_REDIRECTION_MODAL,
  OPEN_DELETE_PRODUCT_MODAL,
  OPEN_DELETE_ORDER_FROM_STATS_MODAL,
  CHOOSE_SIDEBAR_TAB,
  INIT_LIVEDATA,
  INIT_LIVEDATA_ERROR,
  REFRESH_LIVEDATA,
  GET_REDIRECTIONS,
  GET_REDIRECTIONS_ERROR,
  START_EDITING_REDIRECTION,
  ADD_PRODUCTS_TO_REDIRECTION,
  START_ADDING_PRODUCTS_TO_REDIRECTION,
  START_ADDING_PRODUCTS_TO_REDIRECTION_ERROR,
  ADD_REDIRECTION,
  ADD_REDIRECTION_ERROR,
  START_ADDING_REDIRECTION,
  SAVE_REDIRECTION,
  SAVE_REDIRECTION_ERROR,
  DELETE_REDIRECTION,
  DELETE_REDIRECTION_ERROR,
  BACK_TO_REDIRECTIONS_LIST,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCTS_LIST,
  START_EDITING_PRODUCT,
  START_ADDING_PRODUCT,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  BACK_TO_PRODUCTS_LIST,
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  GET_PRODUCT_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,

  GET_ORDERS_BEGIN,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  GET_ORDER_DETAILS_BEGIN,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
  VIEW_ORDER_DETAILS,
  BACK_TO_ORDERS_LIST,

  START_ADDING_USER,
  ADD_USER,
  ADD_USER_ERROR,
  BACK_TO_USERS_LIST,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  START_CHANGING_PASSWORD,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,

  GET_PARTNUMBERS_BEGIN,
  GET_PARTNUMBERS_SUCCESS,
  GET_PARTNUMBERS_ERROR,
  GET_PARTNUMBER_DETAILS_BEGIN,
  GET_PARTNUMBER_DETAILS_SUCCESS,
  GET_PARTNUMBER_DETAILS_ERROR,
  GET_PARTNUMBER_CONFIG,
  GET_PARTNUMBER_CONFIG_ERROR,
  SAVE_PARTNUMBER_CONFIG,
  SAVE_PARTNUMBER_CONFIG_ERROR,
  SAVE_PARTNUMBER,
  SAVE_PARTNUMBER_ERROR,
  START_EDITING_PARTNUMBER,
  START_ADDING_PARTNUMBER,
  CONFIGURE_PARTNUMBERS,
  UPDATE_PARTNUMBERS_LIST,
  EDIT_PARTNUMBER_DETAILS,
  BACK_TO_PARTNUMBERS_LIST,
  UPDATE_GIVEN_HOURLY_RATE,
  UPDATE_GIVEN_TACT_TIME,

  ADD_LINK_IN_PRODUCT,
  ADD_LINK_IN_PRODUCT_ERROR,
  ADD_REDIRECTION_IN_PRODUCT,
  ADD_REDIRECTION_IN_PRODUCT_ERROR,
  SET_MESSAGE,
  DELETE_CONNECTED_LINK_ITEM,
  DELETE_CONNECTED_LINK_ITEM_ERROR,
  DELETE_CONNECTED_REDIRECTION_ITEM,
  DELETE_CONNECTED_REDIRECTION_ITEM_ERROR,
  SEND_PRODUCTS,
  UPDATE_MANY_PRODS_WITH_ONE_REDIR,
  UPDATE_MANY_PRODS_WITH_ONE_REDIR_ERROR,
  REDIRECTION_WITH_PRODUCTS_PAGE,
  NEW,
  EDIT,
  LIST,
  VIEW,
  CONFIG,
  ADD_PARTNUMBER,
  ADD_PARTNUMBER_ERROR,
  OPEN_DELETE_PARTNUMBER_MODAL,
  DELETE_PARTNUMBER,
  DELETE_PARTNUMBER_ERROR,
  SET_MODAL_ERROR_MESSAGE,

  GET_OPERATORS_BEGIN,
  GET_OPERATORS_SUCCESS,
  GET_OPERATORS_ERROR,

  BACK_TO_OPERATORS_LIST,
  START_ADDING_OPERATOR,
  ADD_OPERATOR_BEGIN,
  ADD_OPERATOR,
  ADD_OPERATOR_ERROR,
}

export enum Tab {
  AnalyticsLines,
  AnalyticsOrders,
  AnalyticsPartnumbers,
  AnalyticsLiveView,
  ManagementCustomers,
  ManagementLines,
  ManagementOrders,
  ManagementTactTimes,
  ManagementUsers,
  ManagementProducts,
  ManagementRedirections,
  ManagementOperators,
}

export type AuthAction =
  | SigninAction
  | SigninActionError
  | SignoutAction
  | AddUserAction
  | AddUserActionError;

export type ScannerAction =
  | FetchMessageAction
  | InsertScanAction
  | InsertScanActionError
  | GetOrderAction
  | GetOrderActionError
  | GetLinesAction
  | GetLinesActionError
  | PickLineAction
  | PickLineActionError
  | FreeLineAction
  | FreeLineActionError
  | OccupyLineWithOrderAction
  | OccupyLineWithOrderActionError
  | GetMenuAction
  | GetMenuActionError
  | PickOrderAction
  | PickOrderActionError
  | CreateOrderAction
  | CreateOrderActionError
  | CloseOrderAction
  | CloseOrderActionError
  | DeleteOrderAction
  | DeleteOrderActionError
  | EnableReaderInputAction
  | DisableReaderInputAction
  | AddBreakStartAction
  | AddBreakStartActionError
  | AddBreakEndAction
  | AddBreakEndActionError
  | PauseOrderAction
  | ResumeOrderAction
  | SetOrderPauseStatusAction;

export type ModalAction =
  | OpenFinishModalAction
  | CloseModalAction
  | OpenDeleteModalAction
  | OpenDeleteRedirectionModalAction
  | OpenDeleteProductModalAction
  | OpenDeleteOrderFromStatsModalAction
  | OpenDeletePartnumberModalAction
  | SetModalErrorMessageAction;

export type DashboardAction =
  | ChooseSidebarTabAction
  | InitLiveDataAction
  | InitLiveDataActionError
  | RefreshLiveDataAction
  | GetPartnumbersBeginAction
  | GetPartnumbersSuccessAction
  | GetPartnumbersActionError
  | GetPartnumberDetailsBeginAction
  | GetPartnumberDetailsSuccessAction
  | GetPartnumberDetailsActionError
  | GetPartnumberConfigAction
  | GetPartnumberConfigActionError
  | UpdatePartnumbersListAction
  | ConfigurePartnumbersAction
  | UpdateGivenHourlyRateAction
  | UpdateGivenTactTimeAction
  | SavePartnumberConfigAction
  | SavePartnumberConfigActionError
  | SavePartnumberAction
  | SavePartnumberActionError
  | StartEditingPartnumberAction
  | BackToPartnumbersListAction
  | GetOrdersBeginAction
  | GetOrdersSuccessAction
  | GetOrdersActionError
  | GetOrderDetailsBeginAction
  | GetOrderDetailsSuccessAction
  | GetOrderDetailsActionError
  | ViewOrderDetailsAction
  | BackToOrdersListAction
 | BackToUsersListAction      
 | ChangePasswordAction
 | ChangePasswordActionError
 | GetUsersBeginAction
 | GetUsersSuccessAction
 | GetUsersActionError
 | StartAddingUserAction
 | StartChangingPasswordAction
 | StartAddingPartnumberAction
 | AddPartnumberAction
 | AddPartnumberActionError
 | GetOperatorsBeginAction
 | GetOperatorsSuccessAction
 | GetOperatorsActionError
 | BackToOperatorsListAction
 | StartAddingOperatorAction
 | AddOperatorBeginAction
 | AddOperatorAction
 | AddOperatorActionError;

export type WidsAction =
  | GetRedirectionsAction
  | GetRedirectionsActionError
  | StartEditingRedirectionAction
  | AddProductsToRedirectionAction
  | StartAddingProductsToRedirectionAction
  | StartAddingProductsToRedirectionActionError
  | AddRedirectionAction
  | AddRedirectionActionError
  | StartAddingRedirectionAction
  | SaveRedirectionAction
  | SaveRedirectionActionError
  | DeleteRedirectionAction
  | DeleteRedirectionActionError
  | BackToRedirectionsListAction
  | GetProductsAction
  | GetProductsActionError
  | UpdateProductsListAction
  | StartEditingProductAction
  | StartAddingProductAction
  | DeleteProductAction
  | DeleteProductActionError
  | BackToProductsListAction
  | AddProductAction
  | AddProductActionError
  | GetProductBeginAction
  | GetProductSuccessAction
  | GetProductActionError
  | AddLinkInProductAction
  | AddLinkInProductActionError
  | AddRedirectionInProductAction
  | AddRedirectionInProductActionError
  | DeleteConnectedLinkItemAction
  | DeleteConnectedLinkItemActionError
  | DeleteConnectedRedirectionItemAction
  | DeleteConnectedRedirectionItemActionError
  | SetMessageAction
  | SendProductsAction
  | UpdateManyProdsWithOneRedirAction
  | UpdateManyProdsWithOneRedirActionError
  | DeletePartnumberAction
  | DeletePartnumberActionError;
