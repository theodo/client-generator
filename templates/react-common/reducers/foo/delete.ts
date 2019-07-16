import { combineReducers } from 'redux';


import { ActionType, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';
import { errorAction, loadingAction, successAction } from '../../actions/{{{lc}}}/delete';

export type {{titleUcFirst}}DeleteAction = ActionType<typeof errorAction | typeof loadingAction | typeof successAction>;

export type {{titleUcFirst}}DeleteState = Readonly<{
  error: any | null;
  loading: any | null;
  deleted: any | null;
}>;

export function error(state = null, action: AnyAction) {
  switch (action.type) {
    case getType(errorAction):
      return action.error;

    default:
      return state;
  }
}

export function loading(state = false, action: AnyAction) {
  switch (action.type) {
    case getType(loadingAction):
      return action.loading;

    default:
      return state;
  }
}

export function deleted(state = null, action: AnyAction) {
  switch (action.type) {
    case getType(successAction):
      return action.deleted;

    default:
      return state;
  }
}

export default combineReducers({ error, loading, deleted });
