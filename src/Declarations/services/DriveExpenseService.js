import LocalStorage from "../Data/LocalStorage";
const localStorageKey = "my-drive-expenses";

const DriveExpenseService = {
  getDriveExpenses: () => {
    const data = LocalStorage.getData(localStorageKey);
    return data;
  },
  setDriveExpenses: (data) => {
    LocalStorage.setData(localStorageKey, data);
  },
};

export default DriveExpenseService;
