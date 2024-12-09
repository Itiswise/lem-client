import {
  ActionTypes,
  HourlyRatesType,
  LineType,
  MenuDataType,
  operatorsAttr,
  OperatorsListType,
  OrderStatisticsType,
  OrderType,
  ScannerAction,
} from "../actions";
import {IPosition, positions} from "../utils/positions";

export interface IScannerState {
  message: string;
  lines: LineType[];
  operators: OperatorsListType[];
  positions: IPosition[];
  userType: string;
  userName: string;
  userId: string;
  userEmail: string;
  pickedOrder: string;
  pickedOperators: [operatorsAttr, operatorsAttr, operatorsAttr];
  menu: MenuDataType;
  pickedLine: string;
  deleteMessage: string;
  isPaused: boolean;
  isRunning: boolean;
  isOrderedQuantityMatchesValidScansQuantity: boolean;
  orderDetails?: OrderType;
  orderStats: OrderStatisticsType;
  hourlyRates: HourlyRatesType[];
  errorMessage: string;
  readerInputState: { isDisabled: boolean };
  existingOrder?: OrderType;
}

const SCANNER_INITIAL_STATE: IScannerState = {
  message: "",
  lines: [],
  operators: [],
  positions,
  userType: "",
  userName: "",
  userId: "",
  userEmail: "",
  pickedOrder: "",
  pickedOperators: positions.map((pos) => ({
    position: pos.value,
    operator: null,
  })) as [operatorsAttr, operatorsAttr, operatorsAttr],
  menu: {
    menuContent: [
      {
        _id: "",
        orderNumber: "",
        quantity: 0,
        customer: "",
        qrCode: "",
        partNumber: "",
        tactTime: 0,
      },
    ],
    timestamp: "",
    idCode: "",
  },
  pickedLine: "",
  deleteMessage: "",
  isPaused: false,
  isRunning: false,
  isOrderedQuantityMatchesValidScansQuantity: false,
  orderDetails: { _id: "" },
  errorMessage: "",
  readerInputState: { isDisabled: true },
  hourlyRates: [],
  orderStats: {
    absoluteTime: "",
    givenHourlyRate: 0,
    givenTactTime: 0,
    grossTime: "",
    lastValidScan: "",
    linesUsed: "",
    meanCycleTime: "",
    meanCycleTimeInMilliseconds: 0,
    meanGrossHourlyRate: 0,
    meanHourlyRate: 0,
    netTime: "",
    orderAddedAt: "",
    orderNumber: "",
    orderStatus: "",
    partNumber: "",
    quantity: 0,
    scansAlready: 0,
    validScans: 0,
    xlsxTactTime: 0,
    _orderId: "",
  },
  existingOrder: {
    _id: "",
    scans: [
      {
        _id: "waiting...",
        timeStamp: "",
        errorCode: "",
        scanContent: "",
        operators: positions.map((pos) => ({
          position: pos.value,
          operator: null,
        })) as [operatorsAttr, operatorsAttr, operatorsAttr],
      },
    ],
  },
};

const compareOrderedQuantityWithValidScansQuantity = (
  existingOrder: OrderType
) => {
  if (existingOrder) {
    const { scans } = existingOrder;
    if (scans?.length === 0 || !scans) {
      return false;
    }
    const scansWithoutErrors = scans
      .filter((scan) => scan.errorCode === "e000" || scan.errorCode === "e004")
      .map((scan) => scan.scanContent);
    const orderedQuantity = existingOrder.quantity;
    const currentlyScannedQuantity = scansWithoutErrors.length;

    if (orderedQuantity === currentlyScannedQuantity) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const scannerReducer = (
  state = SCANNER_INITIAL_STATE,
  action: ScannerAction
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        userName: action.payload.user.firstname,
        userEmail: action.payload.user.email,
        userType: action.payload.user.type,
        userId: action.payload.user._id,
      };
    case ActionTypes.INSERT_SCAN:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
        orderStats: action.payload.orderStats,
        hourlyRates: action.payload.hourlyRates,
        isOrderedQuantityMatchesValidScansQuantity:
          compareOrderedQuantityWithValidScansQuantity(
            action.payload.existingOrder
          ),
        errorMessage: "",
      };
    case ActionTypes.INSERT_SCAN_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.GET_ORDER:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
        orderStats: action.payload.orderStats,
        hourlyRates: action.payload.hourlyRates,
        isOrderedQuantityMatchesValidScansQuantity:
          compareOrderedQuantityWithValidScansQuantity(
            action.payload.existingOrder
          ),
        errorMessage: "",
      };
    case ActionTypes.GET_ORDER_ERROR:
      return { ...state, errorMessage: "" };

    case ActionTypes.GET_LINES:
      return {
        ...state,
        lines: action.payload,
      };

    case ActionTypes.GET_LINES_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.GET_SCANNER_OPERATORS_LIST:
      return {
        ...state,
        operators: action.payload,
      };

    case ActionTypes.GET_SCANNER_OPERATORS_LIST_ERROR:
      return {...state, errorMessage: action.payload};

    case ActionTypes.PICK_LINE:
      return {
        ...state,
        pickedLine: action.payload,
        errorMessage: "",
      }

    case ActionTypes.PICK_OPERATORS:
      return {
        ...state,
        pickedOperators: action.payload,
        existingOrder: {
          ...state.existingOrder,
          operators: action.payload,
        }
      };

    case ActionTypes.UPDATE_ORDER_OPERATORS:
      return {
        ...state,
        existingOrder: {
          ...state.existingOrder,
          operators: action.payload,
        },
        pickedOperators: action.payload,
        errorMessage: "",
      };

    case ActionTypes.UPDATE_ORDER_OPERATORS_ERROR:
      return {...state, errorMessage: action.payload};

    case ActionTypes.PICK_LINE_ERROR:
      return { ...state, errorMessage: "" };

    case ActionTypes.GET_MENU:
      return {
        ...state,
        menu: action.payload,
      };

    case ActionTypes.GET_MENU_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.PICK_ORDER:
      return {
        ...state,
        pickedOrder: action.payload.orderNumberFromMenu,
        orderDetails: action.payload.orderDetails,
        errorMessage: "",
      };

    case ActionTypes.PICK_ORDER_ERROR:
      return { ...state, errorMessage: "" };

    case ActionTypes.CREATE_ORDER:
      return {
        ...state,
        existingOrder: action.payload.order,
        errorMessage: "",
      };

    case ActionTypes.CREATE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.DELETE_ORDER:
      return {
        ...state,
        existingOrder: action.payload,
      };

    case ActionTypes.DELETE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.CLOSE_ORDER:
      return {
        ...state, // copy the state (level 0)
        existingOrder: {
          ...state.existingOrder, // copy the nested object (level 1)
          orderStatus: action.payload,
        },
      };

    case ActionTypes.CLOSE_ORDER_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.ENABLE_READER_INPUT:
      return { ...state, readerInputState: action.payload };

    case ActionTypes.DISABLE_READER_INPUT:
      return { ...state, readerInputState: action.payload };

    case ActionTypes.ADD_BREAK_START:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
      };
    case ActionTypes.ADD_BREAK_START_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.ADD_BREAK_END:
      return {
        ...state,
        existingOrder: action.payload.existingOrder,
      };
    case ActionTypes.ADD_BREAK_END_ERROR:
      return { ...state, errorMessage: action.payload };

    case ActionTypes.SET_ORDER_PAUSE_STATUS:
      return {
        ...state,
        isRunning: action.payload,
      };

    case ActionTypes.PAUSE_ORDER:
      return {
        ...state,
        isRunning: action.payload.isRunning,
      };

    case ActionTypes.RESUME_ORDER:
      return {
        ...state,
        isRunning: action.payload.isRunning,
      };

    default:
      return state;
  }
};
