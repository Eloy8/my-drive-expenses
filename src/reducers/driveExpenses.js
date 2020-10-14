import ActionTypes from "../actions/actionTypes";

// Default Redux state
const initialState = {
  addMode: false,
  editMode: false,
  expensesList: null,
  isLoading: true,
  currentEditId: null,
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
    default:
      return state;
  }
};

export default driveExpenses;
