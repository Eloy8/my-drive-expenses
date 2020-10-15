import ActionTypes from "../actions/actionTypes";

// Default Redux state
const initialState = {
  addMode: false,
  editMode: false,
  expensesList: null,
  isLoading: false,
  currentEditId: null,
  hasCreateOrUpdateError: false,
  hasDeleteError: false,
  hasReadError: false,
};

const driveExpenses = (state = initialState, action) => {
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
    case ActionTypes.createOrUpdateDriveExpensesSuccess:
      return {
        ...state,
        isLoading: false,
        expensesList: action.payload,
        hasCreateOrUpdateError: false,
        hasReadError: false,
        hasDeleteError: false,
      };
    case ActionTypes.createOrUpdateDriveExpensesError:
      return {
        ...state,
        isLoading: false,
        hasCreateOrUpdateError: action.payload,
        hasReadError: false,
        hasDeleteError: false,
      };
    case ActionTypes.readDriveExpensesSuccess:
      return {
        ...state,
        isLoading: false,
        expensesList: action.payload,
        hasReadError: false,
        hasCreateOrUpdateError: false,
        hasDeleteError: false,
      };
    case ActionTypes.readDriveExpensesError:
      return {
        ...state,
        isLoading: false,
        hasReadError: action.payload,
        hasCreateOrUpdateError: false,
        hasDeleteError: false,
      };
    case ActionTypes.deleteDriveExpensesSuccess:
      return {
        ...state,
        isLoading: false,
        expensesList: action.payload,
        hasDeleteError: false,
        hasCreateOrUpdateError: false,
        hasReadError: false,
      };
    case ActionTypes.deleteDriveExpensesError:
      return {
        ...state,
        isLoading: false,
        hasDeleteError: action.payload,
        hasCreateOrUpdateError: false,
        hasReadError: false,
      };
    default:
      return state;
  }
};

export default driveExpenses;
