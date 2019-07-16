import { ENTRYPOINT } from '../config/entrypoint';
import { SubmissionError } from 'redux-form';
import get from 'lodash/get';
import has from 'lodash/has';
import mapValues from 'lodash/mapValues';

const MIME_TYPE = 'application/ld+json';

interface optionsInterface {
  headers?: any;
  body?: any;
  method?: string;
}
interface ErrorInterface{
  [key: string]: any;
  _error?: any;
}
const globalAny:any = global;

export function fetch(id: string, options: optionsInterface = {}) {
  if ('undefined' === typeof options.headers) options.headers = new Headers();
  if (null === options.headers.get('Accept'))
    options.headers.set('Accept', MIME_TYPE);

  if (
    'undefined' !== options.body &&
    !(options.body instanceof FormData) &&
    null === options.headers.get('Content-Type')
  )
    options.headers.set('Content-Type', MIME_TYPE);

  return globalAny.fetch(new URL(id, ENTRYPOINT), options).then((response: any) => {
    if (response.ok) return response;

    return response.json().then((json: any) => {
      const error = json['hydra:description'] || response.statusText;
      if (!json.violations) throw Error(error);

      let errors:ErrorInterface = { _error: error };
      json.violations.map(
        (violation: any) => (errors[violation.propertyPath] = violation.message)
      );

      throw new SubmissionError(errors);
    });
  });
}

export function mercureSubscribe(url: any, topics: any) {
  topics.forEach((topic: any) =>
    url.searchParams.append('topic', new URL(topic, ENTRYPOINT))
  );

  return new EventSource(url.toString());
}

export function normalize(data: any) {
  if (has(data, 'hydra:member')) {
    // Normalize items in collections
    data['hydra:member'] = data['hydra:member'].map((item: any) => normalize(item));

    return data;
  }

  // Flatten nested documents
  return mapValues(data, (value: any) =>
    Array.isArray(value)
      ? value.map((v: any) => get(v, '@id', v))
      : get(value, '@id', value)
  );
}

export function extractHubURL(response: any) {
  const linkHeader = response.headers.get('Link');
  if (!linkHeader) return null;

  const matches = linkHeader.match(
    /<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/
  );

  return matches && matches[1] ? new URL(matches[1], ENTRYPOINT) : null;
}
