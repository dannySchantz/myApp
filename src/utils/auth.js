import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
const emptyAuth = {
  token: '',
  userId: ''
};


export function logOut() {
  localStorage.setItem('auth', JSON.stringify(emptyAuth));
  loggedIn.set(false);
  // _updateLoggedIn(false)
  return true;
}
// export let loggedIn = false;
export const loggedIn = writable(false);

export function getUserId() {
  const auth = localStorage.getItem('auth');
  if (auth) {
    return JSON.parse(auth).userId;
  }
  return null;
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem('auth');
  if (auth) {
    return JSON.parse(auth).token;
  }
  return null;
}

export async function isLoggedIn() {
  if (!getTokenFromLocalStorage()) {
    loggedIn.set(false)
    return false;
  }

  try {
    const rawResponse = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getTokenFromLocalStorage()
        }
      }
    );

    const parsedResponse = await rawResponse.json();
    if (rawResponse.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: parsedResponse.token,
          userId: parsedResponse.record.id
        })
      );
      loggedIn.set(true)
      return true;
    }
    return false
  } catch {
    loggedIn.set(false)
    return false;
  }
}

export async function logInUser(username, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: username,
        password
      })
    }
  );

  const res = await resp.json();


  if (resp.status === 200) {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        username: res.username,
        password: res.password,
      })
    );
    loggedIn.set(true)
    return {
      success: true,
      res: res,
    };
  }

  return {
    success: false,
    res: res
  };
}
