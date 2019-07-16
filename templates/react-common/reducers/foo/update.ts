import { combineReducers, AnyAction } from 'redux';
import { mercureOpenAction, mercureDeletedAction, mercureMessageAction, resetAction, retrieveErrorAction, retrieveLoadingAction, retrieveSuccessAction, updateErrorAction, updateLoadingAction, updateSuccessAction } from '../../actions/{{{lc}}}/update';
import { getType, ActionType } from 'typesafe-actions';

export type {{titleUcFirst}}UpdateAction = ActionType<typeof mercureOpenAction | typeof mercureDeletedAction | typeof mercureMessageAction | typeof resetAction | typeof retrieveErrorAction | typeof retrieveLoadingAction | typeof retrieveSuccessAction | typeof updateErrorAction | typeof updateLoadingAction | typeof updateSuccessAction>;

export type {{titleUcFirst}}UpdateState = Readonly<{
  retrieveError: any | null;
  retrieveLoading: any | null;
  retrieved: any | null;
  updateError: any | null;
  updateLoading: any | null;
  updated: any | null;
  eventSource: any | null;
}>;

export function retrieveError(state = null, action: AnyAction) {
  switch (action.type) {
    case getType(retrieveErrorAction):
      return action.retrieveError;

    case getType(mercureDeletedAction):
      return `${action.retrieved['@id']} has been deleted by another user.`;

    case getType(resetAction):
      return null;

    default:
      return state;
  }
}

export function retrieveLoading(state = false, action: AnyAction) {
  switch (action.type) {
    case getType(retrieveLoadingAction):
      return action.retrieveLoading;

    case getType(resetAction):
      return false;

    default:
      return state;
  }
}

export function retrieved(state = null, action: AnyAction) {
  switch (action.type) {
    case getType(retrieveSuccessAction):
    case getType(mercureMessageAction):
      return action.retrieved;

    case getType(resetAction):
      return null;

    default:
      return state;
  }
}

export function updateError(state = null, action: AnyAction) {
  switch (action.type) {
    case getType(updateErrorAction):
      return action.updateError;

    case getType(resetAction):
      return null;

    default:
      return state;
  }
}

export function updateLoading(state = false, action: AnyAction) {
  switch (action.type) {
    case getType(updateLoadingAction):
      return action.updateLoading;

    case getType(resetAction):
      return false;

    default:
      return state;
  }
}

export function updated(state = null, action: AnyAction) {
  switch (action.type) {
    case getType(updateSuccessAction):
      return action.updated;

    case getType(resetAction):
      return null;

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

export default combineReducers({
  retrieveError,
  retrieveLoading,
  retrieved,
  updateError,
  updateLoading,
  updated,
  eventSource
});
