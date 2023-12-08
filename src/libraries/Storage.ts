const Storage = ((): { [x: string]: string | null } => {
  const apiURL = process.env.REACT_APP_API_URL ?? '';
  const accessToken = localStorage.getItem('access_token');
  const isLoggedIn = localStorage.getItem('is_logged_in');
  const username = localStorage.getItem('username');
  const usersId = localStorage.getItem('user_id');
  const email = localStorage.getItem('email');

  const items = {
    api_url: apiURL, access_token: accessToken,
    email: email, is_logged_in: isLoggedIn,
    username: username, user_id: usersId
  };

  return items;
});

export class StorageService {
  static get(key: string): string | null {
    const storage = Storage();

    if (!Object.keys(storage).includes(key)) return null;

    return storage[key];
  }

  static set(key: string, value: string): void {
    localStorage.setItem(key, value);

    return;
  }

  static setN(attributes: { [x: string]: string }): void {
    if (!Object.keys.length) return;

    for (const [key, value] of Object.entries(attributes)) StorageService.set(key, value);

    return;
  }
}