import ActionTypes from "./actionTypes";
import DriveExpenseService from "../Declarations/services/DriveExpenseService";

const setAddMode = (addMode) => {
  return {
    type: ActionTypes.setAddMode,
    payload: addMode,
  };
};

const setEditMode = (editMode) => {
  return {
    type: ActionTypes.setEditMode,
    payload: editMode,
  };
};

const setExpensesList = (expensesList) => {
  return {
    type: ActionTypes.setExpenseList,
    payload: expensesList,
  };
};

const setIsLoading = (isLoading) => {
  return {
    type: ActionTypes.setIsLoading,
    payload: isLoading,
  };
};

const editCurrentEntry = (id) => {
  return {
    type: ActionTypes.editCurrentEntry,
    payload: id,
  };
};

const exitCreateOrUpdateMode = () => {
  return {
    type: ActionTypes.exitCreateOrUpdateMode,
  };
};

const setCurrentEditId = (currentEditId) => {
  return {
    type: ActionTypes.setCurrentEditId,
    payload: currentEditId,
  };
};

const createOrUpdateDriveExpenses = (driveExpenses) => async (dispatch) => {
  dispatch({ type: ActionTypes.setIsLoading, payload: true });
  const data = await DriveExpenseService.createOrUpdateDriveExpenses(
    driveExpenses
  );
  if (Array.isArray(data)) {
    return dispatch({
      type: ActionTypes.createOrUpdateDriveExpensesSuccess,
      payload: data,
    });
  }
  return dispatch({
    type: ActionTypes.createOrUpdateDriveExpensesError,
    payload: data,
  });
};

const readDriveExpenses = () => async (dispatch) => {
  dispatch({ type: ActionTypes.setIsLoading, payload: true });
  const data = await DriveExpenseService.readDriveExpenses();
  if (Array.isArray(data)) {
    return dispatch({
      type: ActionTypes.readDriveExpensesSuccess,
      payload: data,
    });
  }
  return dispatch({
    type: ActionTypes.readDriveExpensesError,
    payload: data,
  });
};

const deleteDriveExpenses = (id) => async (dispatch) => {
  dispatch({ type: ActionTypes.setIsLoading, payload: true });
  const data = await DriveExpenseService.deleteDriveExpenses(id);
  if (Array.isArray(data)) {
    return dispatch({
      type: ActionTypes.deleteDriveExpensesSuccess,
      payload: data,
    });
  }
  return dispatch({
    type: ActionTypes.deleteDriveExpensesError,
    payload: data,
  });
};

export default {
  setAddMode,
  setEditMode,
  setExpensesList,
  setIsLoading,
  setCurrentEditId,
  editCurrentEntry,
  exitCreateOrUpdateMode,
  createOrUpdateDriveExpenses,
  readDriveExpenses,
  deleteDriveExpenses,
};
