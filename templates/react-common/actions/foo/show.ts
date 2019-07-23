import {
  fetch,
  extractHubURL,
  normalize,
  mercureSubscribe as subscribe
} from '../../utils/dataAccess';

import { createCustomAction } from 'typesafe-actions';
import { Dispatch } from 'redux';


export const resetAction = createCustomAction('{{{uc}}}_ADMIN_SHOW_RESET', type => {
  return () => ({ type });
});
export const errorAction = createCustomAction('{{{uc}}}_ADMIN_SHOW_ERROR', type => {
  return (error: string | null) => ({ type, error });
});
export const loadingAction = createCustomAction('{{{uc}}}_ADMIN_SHOW_LOADING', type => {
  return (loading: boolean) => ({ type, loading });
});
export const successAction = createCustomAction('{{{uc}}}_ADMIN_SHOW_SUCCESS', type => {
  return (retrieved: any) => ({ type, retrieved });
});
export const mercureOpenAction = createCustomAction('{{{uc}}}_ADMIN_SHOW_MERCURE_OPEN', type => {
  return (eventSource: any) => ({ type, eventSource });
});
export const mercureDeletedAction = createCustomAction('{{{uc}}}_ADMIN_SHOW_MERCURE_DELETED', type => {
  return (retrieved: any) => ({ type, retrieved });
});
export const mercureMessageAction = createCustomAction('{{{uc}}}_ADMIN_SHOW_MERCURE_MESSAGE', type => {
  return (retrieved: any) => ({ type, retrieved });
});

export function retrieve(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(loadingAction(true));

    return fetch(id)
      .then((response: any) =>
        response
          .json()
          .then((retrieved: any) => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }: any) => {
        retrieved = normalize(retrieved);

        dispatch(loadingAction(false));
        dispatch(successAction(retrieved));

        if (hubURL) mercureSubscribe(hubURL, retrieved['@id'])(dispatch);
      })
      .catch((e: any) => {
        dispatch(loadingAction(false));
        dispatch(errorAction(e.message));
      });
  };
}

export function reset(eventSource: any) {
  return (dispatch: Dispatch) => {
    if (eventSource) eventSource.close();

    dispatch(resetAction());
    dispatch(errorAction(null));
    dispatch(loadingAction(false));
  };
}

export function mercureMessage(retrieved: any) {
  if (1 === Object.keys(retrieved).length) {
    return mercureDeletedAction(retrieved);
  }
  return mercureMessageAction(retrieved);
}

export function mercureSubscribe(hubURL: any, topic: any) {
  return (dispatch: Dispatch) => {
    const eventSource = subscribe(hubURL, [topic]);
    dispatch(mercureOpenAction(eventSource));
    eventSource.addEventListener('message', (event: any) =>
      dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  };
}
