import { ActionTypes } from "../../actions";
import {IPosition} from "../../utils/positions";

export type PickPositionAction = {
    type: ActionTypes.PICK_POSITION;
    payload: IPosition;
};

export const pickPosition =
    (position: IPosition): PickPositionAction => {
        return { type: ActionTypes.PICK_POSITION, payload: position };
    };
