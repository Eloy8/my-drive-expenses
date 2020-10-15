import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import DeclarationFooter from "./Components/DeclarationFooter";
import DeclarationHeader from "./Components/DeclarationHeader";
import { useSelector, useDispatch } from "react-redux";
import List from "./Components/List";
import allActions from "../actions";
import "./scss/DeclarationDashboard.scss";

const Dashboard = () => {
  const expensesList = useSelector((state) => state.driveExpenses.expensesList);
  const isLoading = useSelector((state) => state.driveExpenses.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.driveExpensesActions.readDriveExpenses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {!isLoading && <List />}
      {expensesList && <DeclarationFooter />}
    </React.Fragment>
  );
};

export default Dashboard;
