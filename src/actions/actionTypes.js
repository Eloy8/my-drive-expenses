// Redux action types
const ActionTypes = {
  setAddMode: "SET_ADD_MODE",
  setEditMode: "SET_EDIT_MODE",
  setExpenseList: "SET_EXPENSES_LIST",
  setIsLoading: "SET_IS_LOADING",
  setCurrentEditId: "SET_CURRENT_EDIT_ID",
  editCurrentEntry: "EDIT_CURRENT_ENTRY",
  exitCreateOrUpdateMode: "EXIT_CREATE_OR_UPDATE_MODE",
  createOrUpdateDriveExpensesSuccess: "CREATE_OR_UPDATE_DRIVE_EXPENSES_SUCCESS",
  createOrUpdateDriveExpensesError: "CREATE_OR_UPDATE_DRIVE_EXPENSES_ERROR",
  readDriveExpensesSuccess: "READ_DRIVE_EXPENSES_SUCCESS",
  readDriveExpensesError: "READ_DRIVE_EXPENSES_ERROR",
  deleteDriveExpensesSuccess: "DELETE_DRIVE_EXPENSES_SUCCESS",
  deleteDriveExpensesError: "DELETE_DRIVE_EXPENSES_ERROR",
};

export default ActionTypes;
