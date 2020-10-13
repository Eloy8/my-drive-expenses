import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import NearMeIcon from "@material-ui/icons/NearMe";
import Line from "./Line";
import "../scss/List.scss";

const List = ({
  addMode,
  editMode,
  setAddMode,
  setEditMode,
  createOrUpdateDriveExpenses,
  deleteDriveExpenses,
  expensesList,
}) => {
  const [currentlyEditEntryId, setCurrentlyEditEntryId] = useState(null);
  const expensesListIsEmpty = !expensesList || !expensesList.length;

  return (
    <div className="list">
      {expensesListIsEmpty && !addMode && (
        <React.Fragment>
          <Typography variant="h6">
            <NotListedLocationIcon />
            Bij ons zijn nog geen gedeclareerde rijkosten bekend...
          </Typography>
          <Typography variant="h6">
            Voeg nieuwe rijkosten toe via de knop rechtsboven! <NearMeIcon />
          </Typography>
        </React.Fragment>
      )}
      {!expensesListIsEmpty &&
        expensesList.map((expensesLine) => (
          <Line
            createOrUpdateDriveExpenses={createOrUpdateDriveExpenses}
            deleteDriveExpenses={deleteDriveExpenses}
            key={expensesLine.id}
            editMode={editMode}
            expensesLine={expensesLine}
            setEditMode={setEditMode}
            currentlyEditEntryId={currentlyEditEntryId}
            setCurrentlyEditEntryId={setCurrentlyEditEntryId}
          />
        ))}
      {addMode && (
        <Line
          createOrUpdateDriveExpenses={createOrUpdateDriveExpenses}
          expensesLine={expensesList && expensesList[editMode]}
          addMode
          key={expensesList && expensesList.length + 1}
          setAddMode={setAddMode}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export default List;
