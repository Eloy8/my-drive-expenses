import ActionTypes from "./actionTypes";

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
    payload: id
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

const createOrUpdateDriveExpenses = (data) => {
  return {
    type: ActionTypes.createOrUpdateDriveExpenses,
    payload: data,
  };
};

const readDriveExpenses = () => {
  return {
    type: ActionTypes.readDriveExpenses,
  };
};

const deleteDriveExpenses = (id) => {
  return {
    type: ActionTypes.deleteDriveExpenses,
    payload: id,
  };
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
