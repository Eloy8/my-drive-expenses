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

const setCurrentEditId = (currentEditId) => {
  return {
    type: ActionTypes.setCurrentEditId,
    payload: currentEditId,
  };
};

export default {
  setAddMode,
  setEditMode,
  setExpensesList,
  setIsLoading,
  setCurrentEditId,
};
