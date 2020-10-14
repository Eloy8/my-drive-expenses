import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import DeclarationFooter from "./Components/DeclarationFooter";
import DeclarationHeader from "./Components/DeclarationHeader";
import DriveExpenseService from "./services/DriveExpenseService";
import { useSelector, useDispatch } from "react-redux";
import List from "./Components/List";
import "./scss/DeclarationDashboard.scss";
import allActions from "../actions";

const Dashboard = () => {
  const expensesList = useSelector((state) => state.driveExpenses.expensesList);
  const isLoading = useSelector((state) => state.driveExpenses.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    //Initially checks for localstorage data
    const data = DriveExpenseService.getDriveExpenses();
    dispatch(allActions.driveExpensesActions.setExpensesList(data));
    dispatch(allActions.driveExpensesActions.setIsLoading(false));
    // Listens to localstorage changes, removed listener upon unmount
    window.addEventListener("storage", localStorageEventListener);
    return () =>
      window.removeEventListener("storage", localStorageEventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const localStorageEventListener = (e) => {
    const data = DriveExpenseService.getDriveExpenses();
    dispatch(allActions.driveExpensesActions.setExpensesList(data));
  };

  const createOrUpdateDriveExpenses = (
    id,
    departureZipcode,
    departureHouseNumber,
    arrivalZipcode,
    arrivalHouseNumber,
    totalDrivingDistance,
    isRetour
  ) => {
    const data = {
      id: Date.now(),
      departureZipcode: departureZipcode,
      departureHouseNumber: departureHouseNumber,
      arrivalZipcode: arrivalZipcode,
      arrivalHouseNumber: arrivalHouseNumber,
      totalDrivingDistance: totalDrivingDistance,
      isRetour: isRetour,
    };
    let expensesListCopy = JSON.parse(JSON.stringify(expensesList));
    // No existing id means that the entry must be created and added to array
    if (!id) {
      // Either adds new entry to existing array or creates a brand new one
      if (expensesList && expensesList.length) {
        // JSON parse and stringy to make a deep copy instead of shalow
        expensesListCopy.push(data);
        DriveExpenseService.setDriveExpenses(expensesListCopy);
      } else {
        DriveExpenseService.setDriveExpenses([data]);
      }
      // If an id exists, it will be used as key to update entry
    } else {
      const entryIndex = expensesList.findIndex((entry) => entry.id === id);
      expensesListCopy[entryIndex] = data;
      DriveExpenseService.setDriveExpenses(expensesListCopy);
    }
    // Notify eventlistener about update
    window.dispatchEvent(new Event("storage"));
  };

  const deleteDriveExpenses = (id) => {
    const entryIndex = expensesList.findIndex((entry) => entry.id === id);
    let expensesListCopy = JSON.parse(JSON.stringify(expensesList));
    expensesListCopy.splice(entryIndex, 1);
    DriveExpenseService.setDriveExpenses(expensesListCopy);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <React.Fragment>
      <DeclarationHeader />
      {isLoading && (
        <div className="dashboard--loading">
          <CircularProgress color="primary" disableShrink size="16vh" />
          <Typography variant="h6" color="primary">
            Aan het laden...
          </Typography>
        </div>
      )}
      {!isLoading && (
        <List
          createOrUpdateDriveExpenses={createOrUpdateDriveExpenses}
          deleteDriveExpenses={deleteDriveExpenses}
        />
      )}
      {expensesList && <DeclarationFooter />}
    </React.Fragment>
  );
};

export default Dashboard;
