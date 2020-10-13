const LocalStorage = {
  getData: (localStorageKey) => {
    const data = localStorage.getItem(localStorageKey);
    const jsonData = JSON.parse(data);
    return jsonData || null;
  },
  setData: (localStorageKey, data) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(localStorageKey, jsonData);
  },
};

export default LocalStorage;
