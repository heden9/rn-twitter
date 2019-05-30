import request from '../utils/request';

export function signIn({ username, password }: { username: string, password: string }) {
  return request('/login', {
    method: 'POST',
    body: { username, password },
  });
}

export function signUp({ username, password }: { username: string, password: string }) {
  return request('/signup', {
    method: 'POST',
    body: { username, password },
  });
}

export function checkLogin() {
  return request('/transToken', {
    method: 'POST',
  });
}

export function getFollows() {
  return request('/follows', {
    method: 'GET',
  });
}
