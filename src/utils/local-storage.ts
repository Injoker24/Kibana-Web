export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  const jsonValue = localStorage.getItem(key);

  if (jsonValue) {
    const value = JSON.parse(jsonValue);
    return value;
  }

  return null;
}

export function clearLocalStorage() {
  localStorage.clear();
  window.location.href = '/dashboard';
}
