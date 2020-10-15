import LocalStorage from "../Data/LocalStorage";
const localStorageKey = "my-drive-expenses";

const DriveExpenseService = {
  readDriveExpenses: async () => {
    try {
      const data = LocalStorage.getData(localStorageKey);
      return data;
    } catch (error) {
      console.error(`Error tijdens het laden van rijdeclaraties!`, error);
      return error;
    }
  },
  createOrUpdateDriveExpenses: async (data) => {
    try {
      const expensesList = await DriveExpenseService.readDriveExpenses();
      let expensesListCopy = JSON.parse(JSON.stringify(expensesList));
      // No existing id means that the entry must be created and added to array
      if (!data.id) {
        const newData = { ...data, id: Date.now() };
        // Either adds new entry to existing array or creates a brand new one
        if (expensesList && expensesList.length) {
          // JSON parse and stringy to make a deep copy instead of shalow
          expensesListCopy.push(newData);
        } else {
          expensesListCopy = [newData];
        }
        // If  id exists, it will be used as key to update entry
      } else {
        const entryIndex = expensesList.findIndex(
          (entry) => entry.id === data.id
        );
        expensesListCopy[entryIndex] = data;
      }
      await DriveExpenseService.saveDriveExpenses(expensesListCopy);
      return expensesListCopy;
    } catch (error) {
      const createOrUpdateErrorText = data.id
        ? `Error tijdens het bewerken van rijdeclaratie ${data.id}!`
        : "Error tijdens het aannmaken van een nieuwe rijdeclaratie!";
      console.error(createOrUpdateErrorText);
      return createOrUpdateErrorText;
    }
  },
  deleteDriveExpenses: async (id) => {
    try {
      const expensesList = await DriveExpenseService.readDriveExpenses();
      const entryIndex = expensesList.findIndex((entry) => entry.id === id);
      let expensesListCopy = JSON.parse(JSON.stringify(expensesList));
      expensesListCopy.splice(entryIndex, 1);
      await DriveExpenseService.saveDriveExpenses(expensesListCopy);
      return expensesListCopy;
    } catch (error) {
      const deleteErrorText = `Error tijdens het verwijderen van rijdeclaratie ${id}!`;
      console.error(deleteErrorText);
      return deleteErrorText;
    }
  },
  saveDriveExpenses: async (data) => {
    try {
      LocalStorage.setData(localStorageKey, data);
    } catch (error) {
      const saveErrorText = `Error tijdens het opslaan van rijdeclaraties!`;
      console.error(saveErrorText);
      return saveErrorText;
    }
  },
};

export default DriveExpenseService;
