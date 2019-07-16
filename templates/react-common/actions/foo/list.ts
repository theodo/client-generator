import {
  fetch,
  normalize,
  extractHubURL,
  mercureSubscribe as subscribe
} from '../../utils/dataAccess';
import { successAction as deleteSuccess } from './delete';


import { createCustomAction } from 'typesafe-actions';
import { Dispatch } from 'redux';

export const errorAction = createCustomAction('{{{uc}}}_LIST_ERROR', type => {
  return (error: string | null) => ({ type, error });
});
export const loadingAction = createCustomAction('{{{uc}}}_LIST_LOADING', type => {
  return (loading: boolean) => ({ type, loading });
});
export const successAction = createCustomAction('{{{uc}}}_LIST_SUCCESS', type => {
  return (retrieved: any) => ({ type, retrieved });
});
export const resetAction = createCustomAction('{{{uc}}}_LIST_RESET', type => {
  return () => ({ type });
});

export const mercureOpenAction = createCustomAction('{{{uc}}}_LIST_MERCURE_OPEN', type => {
  return (eventSource: any) => ({ type, eventSource });
});
export const mercureDeletedAction = createCustomAction('{{{uc}}}_LIST_MERCURE_DELETED', type => {
  return (retrieved: any) => ({ type, retrieved });
});
export const mercureMessageAction = createCustomAction('{{{uc}}}_LIST_MERCURE_MESSAGE', type => {
  return (retrieved: any) => ({ type, retrieved });
});

export function mercureMessage(retrieved: any) {
  if (1 === Object.keys(retrieved).length) {
    return mercureDeletedAction(retrieved);
  }
  return mercureMessageAction(retrieved);
}

export function mercureSubscribe(hubURL: any, topics: any) {
  return (dispatch: Dispatch) => {
    const eventSource = subscribe(hubURL, topics);
    dispatch(mercureOpenAction(eventSource));
    eventSource.addEventListener('message', event =>
      dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  };
}

export function list(page = '{{{name}}}') {
  return (dispatch: Dispatch) => {
    dispatch(loadingAction(true));
    dispatch(errorAction(''));

    fetch(page)
      .then((response: any) =>
        response
          .json()
          .then((retrieved: any) => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }: any) => {
        retrieved = normalize(retrieved);

        dispatch(loadingAction(false));
        dispatch(successAction(retrieved));

        if (hubURL && retrieved['hydra:member'].length)
          mercureSubscribe(
            hubURL,
            retrieved['hydra:member'].map((i: any) => i['@id'])
          );
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
    dispatch(deleteSuccess(null));
  };
}
