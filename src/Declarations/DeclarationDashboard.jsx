import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import DeclarationFooter from "./Components/DeclarationFooter";
import DeclarationHeader from "./Components/DeclarationHeader";
import WarningSnackbar from "./Components/WarningSnackbar";
import { useSelector, useDispatch } from "react-redux";
import List from "./Components/List";
import allActions from "../actions";
import "./scss/DeclarationDashboard.scss";

const Dashboard = () => {
  const expensesList = useSelector((state) => state.driveExpenses.expensesList);
  const isLoading = useSelector((state) => state.driveExpenses.isLoading);
  const hasCreateOrUpdateError = useSelector(
    (state) => state.driveExpenses.hasCreateOrUpdateError
  );
  const hasDeleteError = useSelector(
    (state) => state.driveExpenses.hasDeleteError
  );
  const hasReadError = useSelector((state) => state.driveExpenses.hasReadError);
  
  const error = hasCreateOrUpdateError || hasDeleteError || hasReadError;

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
      {error && <WarningSnackbar error={error} />}
      {expensesList && <DeclarationFooter />}
    </React.Fragment>
  );
};

export default Dashboard;
