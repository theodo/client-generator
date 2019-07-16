import { combineReducers, AnyAction } from 'redux';
import { getType, ActionType } from 'typesafe-actions';


import { errorAction, loadingAction, successAction, resetAction, mercureOpenAction, mercureDeletedAction, mercureMessageAction } from '../../actions/{{{lc}}}/list';

export type {{titleUcFirst}}ListAction = ActionType<typeof errorAction | typeof loadingAction | typeof successAction | typeof resetAction | typeof mercureOpenAction | typeof mercureDeletedAction | typeof mercureMessageAction>;

export type {{titleUcFirst}}ListState = Readonly<{
  error: any | null;
  loading: any | null;
  retrieved: any | null;
  eventSource: any | null;
}>;


interface StateInterface{
  [key: string]: any;
}

export function error(state = null, action: AnyAction) {
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

export function loading(state = false, action: AnyAction) {
  switch (action.type) {
    case getType(loadingAction):
      return action.loading;

    case getType(resetAction):
      return false;

    default:
      return state;
  }
}

export function retrieved(state: StateInterface|null = null, action: AnyAction) {
  switch (action.type) {
    case getType(successAction):
      return action.retrieved;

    case getType(resetAction):
      return null;

    case getType(mercureMessageAction):
      return state && {
        ...state,
        'hydra:member': state['hydra:member'].map((item: any) =>
          item['@id'] === action.retrieved['@id'] ? action.retrieved : item
        )
      };

    case getType(mercureDeletedAction):
      return state && {
        ...state,
        'hydra:member': state['hydra:member'].filter(
          (item: any) => item['@id'] !== action.retrieved['@id']
        )
      };

    default:
      return state;
  }
}

export function eventSource(state = null, action: AnyAction) {
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
