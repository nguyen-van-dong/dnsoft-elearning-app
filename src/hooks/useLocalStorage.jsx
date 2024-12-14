const useLocalStorage = (key, value = '') => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
}

export default useLocalStorage;
