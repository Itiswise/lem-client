import { ActionTypes } from "../../actions";

export type StartAddingPartnumberAction = {
  type: ActionTypes.START_ADDING_PARTNUMBER;
};

export const startAddingPartnumber = (): StartAddingPartnumberAction => {
  return {
    type: ActionTypes.START_ADDING_PARTNUMBER,
  };
};
