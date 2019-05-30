import storage from "./storage";

function parseJSON(response: Response) {
  return response.json();
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  (error as any)._response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url: string, options: RequestInit) {
  const defaultOptions = {
    // credentials: 'include',
  };

  const token = await storage.load({ key: 'token' }).catch(e => '');

  const newOptions = { ...defaultOptions, ...options };
  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    token,
    ...newOptions.headers,
  };
  newOptions.body = JSON.stringify(newOptions.body);
  if (newOptions.method !== 'GET') {
    newOptions.mode = 'cors';
  }
  console.log(`http://app.nefuer.net${url}`, newOptions);
  return fetch(`http://app.nefuer.net${url}`, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch((err) => {
      console.log(err)
    });
}

async function checkCode(res: any) {
  const { code, data, message, token } = res;
  switch (code) {
    case 0:
      await storage.save({
        key: 'token',
        data: token,
      });
      // window.common.writeCookie('token', token, 7);
      return data;
    case 2:
      await storage.remove({
        key: 'token',
      });
      // window.common.writeCookie('token', '');
    default: throw new Error(message);
  }
}
