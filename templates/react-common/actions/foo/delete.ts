import { fetch } from '../../utils/dataAccess';


import { createCustomAction } from 'typesafe-actions';
import { Dispatch } from 'redux';

export const errorAction = createCustomAction('{{{uc}}}_DELETE_ERROR', type => {
  return (error: string | null) => ({ type, error });
});
export const loadingAction = createCustomAction('{{{uc}}}_DELETE_LOADING', type => {
  return (loading: boolean) => ({ type, loading });
});
export const successAction = createCustomAction('{{{uc}}}_DELETE_SUCCESS', type => {
  return (deleted: any) => ({ type, deleted });
});

export function del(item: any) {
  return (dispatch: Dispatch) => {
    dispatch(loadingAction(true));

    return fetch(item['@id'], { method: 'DELETE' })
      .then(() => {
        dispatch(loadingAction(false));
        dispatch(successAction(item));
      })
      .catch((e: any) => {
        dispatch(loadingAction(false));
        dispatch(errorAction(e.message));
      });
  };
}
