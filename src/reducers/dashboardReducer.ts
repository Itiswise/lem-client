import {
  ActionTypes,
  ComputationsBase,
  DashboardAction,
  OperatorsListType,
  OrderDetailsType,
  OrderListType,
  OrderStatsType,
  PartnumberConfigType,
  PartnumberType,
  SourceOfTruth,
  Tab,
  UserType,
} from "../actions";

export interface IDashboardState {
  activeSidebarTab: Tab;
  _id: string;
  userId: string;
  orders: OrderListType[];
  users: UserType[];
  operators: OperatorsListType[],
  partnumbers: PartnumberType[];
  filteredPartnumbers: PartnumberType[];
  orderDetails: OrderDetailsType;
  givenTactTime: number;
  givenHourlyRate: number;
  cleanRoomTime: number;
  partnumberDetails: PartnumberType;
  partnumberConfig: PartnumberConfigType;
  liveView: OrderStatsType[];
  activeOrderComponent: ActionTypes;
  activePartnumberComponent: ActionTypes;
  activeUserComponent: ActionTypes;
  activeOperatorComponent: ActionTypes;
  isLoading: boolean;
  message?: string;
  errorMessage: string;
  allPartnumbersCount: number;
  allOrdersCount: number;
  allOperatorsCount: number;
}

const DASHBOARD_INITIAL_STATE: IDashboardState = {
  activeSidebarTab: Tab.ManagementProducts,
  activeOrderComponent: ActionTypes.LIST,
  activePartnumberComponent: ActionTypes.LIST,
  activeUserComponent: ActionTypes.LIST,
  activeOperatorComponent: ActionTypes.LIST,
  liveView: [],
  _id: "",
  userId: "",
  orders: [],
  operators: [],
  partnumbers: [],
  users: [],
  givenTactTime: 0,
  givenHourlyRate: 0,
  cleanRoomTime: 0,
  filteredPartnumbers: [],
  orderDetails: {
    orderNumber: "",
    _id: "",
    partNumber: "",
    orderStatus: "",
    quantity: 0,
    orderAddedAt: "",
    lastValidScan: "",
    scansAlready: 0,
    validScans: 0,
    linesUsed: "",
    netTime: "",
    meanCycleTime: "",
    meanHourlyRate: 0,
    meanGrossHourlyRate: 0,
    givenHourlyRate: 0,
    hourlyRates: [],
  },
  partnumberConfig: {
    _id: "",
    sourceOftruth: SourceOfTruth.excel,
    computationsBase: ComputationsBase.tactTime,
    whatToShow: ComputationsBase.tactTime,
  },
  partnumberDetails: {
    _id: "",
    givenHourlyRate: 0,
    cleanRoomTime: 0,
    suggestedHourlyRate: 0,
    givenTactTime: 0,
    suggestedTactTime: 0,
    xlsxTactTime: 0,
    automatic: false,
    partNumber: "",
  },
  isLoading: false,
  message: "",
  errorMessage: "",
  allPartnumbersCount: 0,
  allOrdersCount: 0,
  allOperatorsCount: 0,
};

export const dashboardReducer = (
  state = DASHBOARD_INITIAL_STATE,
  action: DashboardAction
) => {
  switch (action.type) {
    case ActionTypes.CHOOSE_SIDEBAR_TAB:
      return {
        ...state,
        activeSidebarTab: action.payload,
      };

    case ActionTypes.GET_ORDERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.START_ADDING_USER:
      return {
        ...state,
        activeUserComponent: ActionTypes.NEW,
      };

    case ActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders,
        allOrdersCount: action.payload.allOrdersCount,
        errorMessage: null,
      };

    case ActionTypes.GET_OPERATORS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      }

    case ActionTypes.GET_OPERATORS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            operators: action.payload.data,
            allOperatorsCount: action.payload.pagination.totalPages,
            errorMessage: null,
        }

    case ActionTypes.GET_OPERATORS_ERROR:
        return {
            ...state,
            errorMessage: action.payload,
            isLoading: false,
        }

    case ActionTypes.BACK_TO_OPERATORS_LIST:
        return {
            ...state,
            activeOperatorComponent: ActionTypes.LIST,
        };

    case ActionTypes.START_ADDING_OPERATOR:
        return {
            ...state,
            activeOperatorComponent: ActionTypes.NEW,
        };

    case ActionTypes.ADD_OPERATOR_BEGIN:
        return {
          ...state,
          isLoading: true,
          errorMessage: null,
        }

    case ActionTypes.ADD_OPERATOR:
        return {
          ...state,
          isLoading: false,
          activeOperatorComponent: ActionTypes.LIST,
          errorMessage: null,
        }

    case ActionTypes.ADD_OPERATOR_ERROR:
        return {
            ...state,
            errorMessage: action.payload,
            isLoading: false,
        }

    case ActionTypes.DELETE_OPERATOR:
      return {
        ...state,
        message: action.payload,
        operators: state.operators?.filter((o) => o._id !== action.payload),
      };

    case ActionTypes.DELETE_OPERATOR_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case ActionTypes.GET_ORDERS_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    case ActionTypes.GET_USERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        errorMessage: null,
      };

    case ActionTypes.GET_USERS_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    case ActionTypes.GET_PARTNUMBERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        partnumbers: action.payload.partnumbers,
        allPartnumbersCount: action.payload.allPartnumbersCount,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBERS_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    case ActionTypes.GET_PARTNUMBER_CONFIG:
      return {
        ...state,
        partnumberConfig: action.payload,
        isLoading: false,
      };

    case ActionTypes.GET_PARTNUMBER_CONFIG_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };

    case ActionTypes.GET_ORDER_DETAILS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderDetails: action.payload,
        errorMessage: null,
      };

    case ActionTypes.GET_ORDER_DETAILS_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.VIEW_ORDER_DETAILS:
      return {
        ...state,
        activeOrderComponent: ActionTypes.VIEW,
        _id: action.payload,
      };

    case ActionTypes.BACK_TO_ORDERS_LIST:
      return {
        ...state,
        activeOrderComponent: ActionTypes.LIST,
      };

    case ActionTypes.GET_PARTNUMBER_DETAILS_BEGIN:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        partnumberDetails: action.payload,
        errorMessage: null,
      };

    case ActionTypes.GET_PARTNUMBER_DETAILS_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.CONFIGURE_PARTNUMBERS:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.CONFIG,
      };

    case ActionTypes.BACK_TO_PARTNUMBERS_LIST:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.LIST,
      };

    case ActionTypes.SAVE_PARTNUMBER_CONFIG:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.LIST,
      };

    case ActionTypes.SAVE_PARTNUMBER_CONFIG_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.UPDATE_PARTNUMBERS_LIST:
      return {
        ...state,
        filteredPartnumbers: action.payload,
      };

    case ActionTypes.START_EDITING_PARTNUMBER:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.EDIT,
        partnumberDetails: action.payload,
      };

    case ActionTypes.START_ADDING_PARTNUMBER:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.NEW,
      };

    case ActionTypes.SAVE_PARTNUMBER:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.LIST,
      };

    case ActionTypes.SAVE_PARTNUMBER_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.ADD_PARTNUMBER:
      return {
        ...state,
        activePartnumberComponent: ActionTypes.LIST,
      };

    case ActionTypes.ADD_PARTNUMBER_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.START_CHANGING_PASSWORD:
      return {
        ...state,
        activeUserComponent: ActionTypes.EDIT,
        userId: action.payload,
      };

    case ActionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        activeUserComponent: ActionTypes.LIST,
      };

    case ActionTypes.CHANGE_PASSWORD_ERROR:
      return { ...state, isLoading: false, errorMessage: action.payload };

    case ActionTypes.UPDATE_GIVEN_HOURLY_RATE:
      return {
        ...state,
        givenHourlyRate: Math.ceil(parseFloat(action.payload)),
      };

    case ActionTypes.UPDATE_GIVEN_TACT_TIME:
      return {
        ...state,
        givenTactTime: Math.floor(parseFloat(action.payload)),
      };

    case ActionTypes.INIT_LIVEDATA:
      return {
        ...state,
        liveView: action.payload,
      };

    case ActionTypes.INIT_LIVEDATA_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    case ActionTypes.REFRESH_LIVEDATA:
      return {
        ...state,
        liveView: action.payload,
      };

    default:
      return state;
  }
};
