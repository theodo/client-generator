import { combineReducers } from 'redux';


import { ActionType, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';
import { resetAction, errorAction, loadingAction, successAction, mercureOpenAction, mercureDeletedAction, mercureMessageAction } from '../../actions/{{{lc}}}/show';

export type {{titleUcFirst}}ShowAction = ActionType<typeof resetAction | typeof errorAction | typeof loadingAction | typeof successAction | typeof mercureOpenAction | typeof mercureDeletedAction | typeof mercureMessageAction>;

export type {{titleUcFirst}}ShowState = Readonly<{
  error: any | null;
  loading: any | null;
  retrieved: any | null;
  eventSource: any | null;
}>;
export function error(state: any = null, action: AnyAction) {
  switch (action.type) {
    case getType(errorAction):
      return action.error;

    case getType(mercureDeletedAction):
      return `${action.retrieved['@id']} has been deleted by another user.`;

    case getType(resetAction):
      return null;

    default:
      return state;
  }
}

export function loading(state: boolean = false, action: AnyAction) {
  switch (action.type) {
    case getType(loadingAction):
      return action.loading;

    case getType(resetAction):
      return false;

    default:
      return state;
  }
}

export function retrieved(state: any = null, action: AnyAction) {
  switch (action.type) {
    case getType(successAction):
    case getType(mercureMessageAction):
      return action.retrieved;

    case getType(resetAction):
      return null;

    default:
      return state;
  }
}

export function eventSource(state: any = null, action: AnyAction) {
  switch (action.type) {
    case getType(mercureOpenAction):
      return action.eventSource;

    case getType(resetAction):
      return null;

    default:
      return state;
  }
}

export default combineReducers({ error, loading, retrieved, eventSource });
