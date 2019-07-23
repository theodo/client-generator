import { fetch } from '../../utils/dataAccess';

import { createCustomAction } from 'typesafe-actions';
import { Dispatch } from 'redux';

export const errorAction = createCustomAction('{{{uc}}}_ADMIN_CREATE_ERROR', type => {
  return (error: string | null) => ({ type, error });
});
export const loadingAction = createCustomAction('{{{uc}}}_ADMIN_CREATE_LOADING', type => {
  return (loading: boolean) => ({ type, loading });
});
export const successAction = createCustomAction('{{{uc}}}_ADMIN_CREATE_SUCCESS', type => {
  return (created: any) => ({ type, created });
});


export function create(values: any) {
  return (dispatch: Dispatch) => {
    dispatch(loadingAction(true));

    return fetch('{{{name}}}', { method: 'POST', body: JSON.stringify(values) })
      .then((response: any) => {
        dispatch(loadingAction(false));

        return response.json();
      })
      .then((retrieved: any) => dispatch(successAction(retrieved)))
      .catch((e: any) => {
        dispatch(loadingAction(false));

        dispatch(errorAction(e.message));
      });
  };
}

export function reset() {
  return (dispatch: Dispatch) => {
    dispatch(loadingAction(false));
    dispatch(errorAction(null));
  };
}
