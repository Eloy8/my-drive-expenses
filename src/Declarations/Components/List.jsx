import React from "react";
import Typography from "@material-ui/core/Typography";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import NearMeIcon from "@material-ui/icons/NearMe";
import Line from "./Line";
import { useSelector } from "react-redux";
import "../scss/List.scss";

const List = ({ createOrUpdateDriveExpenses, deleteDriveExpenses }) => {
  const addMode = useSelector((state) => state.driveExpenses.addMode);
  const editMode = useSelector((state) => state.driveExpenses.editMode);
  const expensesList = useSelector((state) => state.driveExpenses.expensesList);

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
            expensesLine={expensesLine}
          />
        ))}
      {addMode && (
        <Line
          createOrUpdateDriveExpenses={createOrUpdateDriveExpenses}
          expensesLine={expensesList && expensesList[editMode]}
          addMode
          key={expensesList && expensesList.length + 1}
        />
      )}
    </div>
  );
};

export default List;
