/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import basename from './Basename';

export const BASE_API_URL = `${basename}/api`;

/**
 * Data fetcher specific to the SWR library
 * @param {string} url endpoint to fetch data from
 * @param {any} body request body items
 */
export const SWRFetcher = async (url: string) => {
  let resp;
  let text;

  // sometimes the backend does not return a json responses, so we should handle plain text responses
  try {
    resp = await fetch(`${BASE_API_URL}${url}`);

    text = await resp.text(); // parse it as text
    const json = JSON.parse(text); // try to parse is as json

    // If the status code is not in the range 200-299,
    if (!resp.ok) {
      throw new Error(json.message); // custom error message found in our json response
    }

    return json;
  } catch (err) {
    if (!resp?.ok) {
      throw new Error(`Error occurred fetching at ${BASE_API_URL}${url}`); // generic error message
    }
    return text;
  }
};
