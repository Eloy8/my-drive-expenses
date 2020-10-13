import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeclarationFooter from "./Components/DeclarationFooter";
import DeclarationHeader from "./Components/DeclarationHeader";
import DriveExpenseService from "./services/DriveExpenseService";
import List from "./Components/List";
import "./scss/DeclarationDashboard.scss";
import Typography from "@material-ui/core/Typography";

const Dashboard = () => {
  const [expensesList, setExpensesList] = useState(null);
  const [addMode, setAddMode] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Initially checks for localstorage data
    const data = DriveExpenseService.getDriveExpenses();
    setExpensesList(data);
    setIsLoading(false);
    // Listens to localstorage changes, removed listener upon unmount
    window.addEventListener("storage", localStorageEventListener);
    return () =>
      window.removeEventListener("storage", localStorageEventListener);
  }, []);

  const localStorageEventListener = (e) => {
    const data = DriveExpenseService.getDriveExpenses();
    setExpensesList(data);
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
      <DeclarationHeader
        addMode={addMode}
        editMode={editMode}
        setAddMode={setAddMode}
      />
      {isLoading && (
        <div className="dashboard--loading">
          <CircularProgress color="primary" disableShrink size="16vh" />
          <Typography variant="h6" color="primary">
            Loading...
          </Typography>
        </div>
      )}
      {!isLoading && (
        <List
          addMode={addMode}
          setAddMode={setAddMode}
          editMode={editMode}
          setEditMode={setEditMode}
          createOrUpdateDriveExpenses={createOrUpdateDriveExpenses}
          deleteDriveExpenses={deleteDriveExpenses}
          expensesList={expensesList}
        />
      )}
      {expensesList && <DeclarationFooter expensesList={expensesList} />}
    </React.Fragment>
  );
};

export default Dashboard;
