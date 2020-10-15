import ActionTypes from "../actions/actionTypes";
import DriveExpenseService from "../Declarations/services/DriveExpenseService";

// Default Redux state
const initialState = {
  addMode: false,
  editMode: false,
  expensesList: null,
  isLoading: true,
  currentEditId: null,
};

const driveExpenses = (state = initialState, action) => {
  const { expensesList } = state;
  switch (action.type) {
    case ActionTypes.setAddMode:
      return {
        ...state,
        addMode: action.payload,
      };
    case ActionTypes.setEditMode:
      return {
        ...state,
        editMode: action.payload,
      };
    case ActionTypes.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.setExpenseList:
      return {
        ...state,
        expensesList: action.payload,
      };
    case ActionTypes.setCurrentEditId:
      return {
        ...state,
        currentEditId: action.payload,
      };
    case ActionTypes.exitCreateOrUpdateMode:
      return {
        ...state,
        addMode: false,
        editMode: false,
        currentEditId: null,
      };
    case ActionTypes.editCurrentEntry:
      return {
        ...state,
        editMode: true,
        currentEditId: action.payload,
      };
    case ActionTypes.createOrUpdateDriveExpenses:
      const data = action.payload;
      let expensesListCopy = JSON.parse(JSON.stringify(expensesList));
      // No existing id means that the entry must be created and added to array
      if (!data.id) {
        const newData = { ...data, id: Date.now() };
        // Either adds new entry to existing array or creates a brand new one
        if (expensesList && expensesList.length) {
          // JSON parse and stringy to make a deep copy instead of shalow
          expensesListCopy.push(newData);
          DriveExpenseService.setDriveExpenses(expensesListCopy);
        } else {
          expensesListCopy = [newData];
          DriveExpenseService.setDriveExpenses(expensesListCopy);
        }
        // If  id exists, it will be used as key to update entry
      } else {
        const entryIndex = expensesList.findIndex((entry) => entry.id === data.id);
        expensesListCopy[entryIndex] = data;
        DriveExpenseService.setDriveExpenses(expensesListCopy);
      }
      return {
        ...state,
        expensesList: expensesListCopy,
      };
    case ActionTypes.readDriveExpenses:
      const newExpenseList = DriveExpenseService.getDriveExpenses();
      return {
        ...state,
        expensesList: newExpenseList,
        isLoading: false,
      };
    case ActionTypes.deleteDriveExpenses:
      const entryIndex = expensesList.findIndex(
        (entry) => entry.id === action.payload
      );
      let expensesListDuplicate = JSON.parse(JSON.stringify(expensesList));
      expensesListDuplicate.splice(entryIndex, 1);
      DriveExpenseService.setDriveExpenses(expensesListDuplicate);
      return {
        ...state,
        expensesList: expensesListDuplicate,
      };
    default:
      return state;
  }
};

export default driveExpenses;
