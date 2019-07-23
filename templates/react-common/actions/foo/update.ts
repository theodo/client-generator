import {
  fetch,
  extractHubURL,
  normalize,
  mercureSubscribe as subscribe
} from '../../utils/dataAccess';
import { successAction as createSuccess } from './create';
import { loadingAction, errorAction } from './delete';



import { createCustomAction } from 'typesafe-actions';
import { Dispatch } from 'redux';



export const mercureOpenAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_MERCURE_OPEN', type => {
  return (eventSource: any | null) => ({ type, eventSource });
});
export const mercureDeletedAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_MERCURE_DELETED', type => {
  return (retrieved: any | null) => ({ type, retrieved });
});
export const mercureMessageAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_MERCURE_MESSAGE', type => {
  return (retrieved: any | null) => ({ type, retrieved });
});


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
    eventSource.addEventListener('message', event =>
      dispatch(mercureMessage(normalize(JSON.parse(event.data))))
    );
  };
}

export const resetAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_RESET', type => {
  return () => ({ type });
});


export const retrieveErrorAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_RETRIEVE_ERROR', type => {
  return (retrieveError: string | null) => ({ type, retrieveError });
});
export const retrieveLoadingAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_RETRIEVE_LOADING', type => {
  return (retrieveLoading: boolean | null) => ({ type, retrieveLoading });
});
export const retrieveSuccessAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_RETRIEVE_SUCCESS', type => {
  return (retrieved: any | null) => ({ type, retrieved });
});

export function retrieve(id: string) {
  return (dispatch: Dispatch) => {
    dispatch(retrieveLoadingAction(true));

    return fetch(id)
      .then((response: any) =>
        response
          .json()
          .then((retrieved: any) => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }: any) => {
        retrieved = normalize(retrieved);

        dispatch(retrieveLoadingAction(false));
        dispatch(retrieveSuccessAction(retrieved));

        if (hubURL) mercureSubscribe(hubURL, retrieved['@id'])(dispatch);
      })
      .catch((e: any) => {
        dispatch(retrieveLoadingAction(false));
        dispatch(retrieveErrorAction(e.message));
      });
  };
}

export const updateErrorAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_UPDATE_ERROR', type => {
  return (updateError: string | null) => ({ type, updateError });
});
export const updateLoadingAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_UPDATE_LOADING', type => {
  return (updateLoading: boolean | null) => ({ type, updateLoading });
});
export const updateSuccessAction = createCustomAction('{{{uc}}}_ADMIN_UPDATE_UPDATE_SUCCESS', type => {
  return (updated: any | null) => ({ type, updated });
});


export function update(item: any, values: any) {
  return (dispatch: Dispatch) => {
    dispatch(updateErrorAction(null));
    dispatch(createSuccess(null));
    dispatch(updateLoadingAction(true));

    return fetch(item['@id'], {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/ld+json' }),
      body: JSON.stringify(values)
    })
      .then((response: any) =>
        response
          .json()
          .then((retrieved: any) => ({ retrieved, hubURL: extractHubURL(response) }))
      )
      .then(({ retrieved, hubURL }: any) => {
        retrieved = normalize(retrieved);

        dispatch(updateLoadingAction(false));
        dispatch(updateSuccessAction(retrieved));

        if (hubURL) mercureSubscribe(hubURL, retrieved['@id'])(dispatch);
      })
      .catch((e: any) => {
        dispatch(updateLoadingAction(false));

        dispatch(updateErrorAction(e.message));
      });
  };
}

export function reset(eventSource: any) {
  return (dispatch: Dispatch) => {
    if (eventSource) eventSource.close();

    dispatch(resetAction());
    dispatch(errorAction(null));
    dispatch(loadingAction(false));
    dispatch(createSuccess(null));
  };
}
