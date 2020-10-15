import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import BlockIcon from "@material-ui/icons/Block";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import FlagIcon from "@material-ui/icons/Flag";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import PlaceIcon from "@material-ui/icons/Place";
import EditIcon from "@material-ui/icons/Edit";
import DriveExpensesValidation from "../utils/DriveExpensesValidation";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions/index";
import "../scss/Line.scss";

const Line = ({ addMode = false, expensesLine }) => {
  const editMode = useSelector((state) => state.driveExpenses.editMode);
  const currentEditId = useSelector(
    (state) => state.driveExpenses.currentEditId
  );
  const [initialValues, setInitialValues] = useState(null);
  const isInAddOrEditMode =
    addMode || (expensesLine && editMode && currentEditId === expensesLine.id);

  const dispatch = useDispatch();

  useEffect(() => {
    function checkForContent() {
      const newInitialValues = {
        entryId: expensesLine ? expensesLine.id : "",
        departureZipcode: expensesLine ? expensesLine.departureZipcode : "",
        departureHouseNumber: expensesLine
          ? expensesLine.departureHouseNumber
          : "",
        arrivalZipcode: expensesLine ? expensesLine.arrivalZipcode : "",
        arrivalHouseNumber: expensesLine ? expensesLine.arrivalHouseNumber : "",
        totalDrivingDistance: expensesLine
          ? expensesLine.totalDrivingDistance
          : "",
        isRetour: expensesLine ? expensesLine.isRetour : false,
      };
      setInitialValues(newInitialValues);
    }
    checkForContent();
  }, [expensesLine]);

  const catchEnter = (e, callback) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  return (
    <React.Fragment>
      {initialValues && (
        <Formik
          onSubmit={(values) => {
            const data = {
              id: values.entryId,
              departureZipcode: values.departureZipcode,
              departureHouseNumber: values.departureHouseNumber,
              arrivalZipcode: values.arrivalZipcode,
              arrivalHouseNumber: values.arrivalHouseNumber,
              totalDrivingDistance: values.totalDrivingDistance,
              isRetour: values.isRetour,
            };
            dispatch(
              allActions.driveExpensesActions.createOrUpdateDriveExpenses(data)
            );
            dispatch(allActions.driveExpensesActions.exitCreateOrUpdateMode());
          }}
          initialValues={initialValues}
          validationSchema={DriveExpensesValidation}
        >
          {(props) => {
            const {
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
            } = props;

            return (
              <div className="line">
                <Paper>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <PlaceIcon className="line--icon" />
                        <TextField
                          autoFocus={isInAddOrEditMode}
                          className="line--input-medium"
                          disabled={!isInAddOrEditMode}
                          id="departureZipcode"
                          name="departureZipcode"
                          helperText={
                            touched.departureZipcode
                              ? errors.departureZipcode
                              : ""
                          }
                          error={
                            touched.departureZipcode &&
                            Boolean(errors.departureZipcode)
                          }
                          label="Postcode vertrek"
                          value={values.departureZipcode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextField
                          className="line--input-small"
                          disabled={!isInAddOrEditMode}
                          id="departureHouseNumber"
                          name="departureHouseNumber"
                          helperText={
                            touched.departureHouseNumber
                              ? errors.departureHouseNumber
                              : ""
                          }
                          error={
                            touched.departureHouseNumber &&
                            Boolean(errors.departureHouseNumber)
                          }
                          label={"Huisnummer"}
                          value={values.departureHouseNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs>
                        <FlagIcon className="line--icon" />
                        <TextField
                          className="line--input-medium"
                          disabled={!isInAddOrEditMode}
                          id="arrivalZipcode"
                          name="arrivalZipcode"
                          helperText={
                            touched.arrivalZipcode ? errors.arrivalZipcode : ""
                          }
                          error={
                            touched.arrivalZipcode &&
                            Boolean(errors.arrivalZipcode)
                          }
                          label="Postcode bestemming"
                          value={values.arrivalZipcode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <TextField
                          className="line--input-small"
                          disabled={!isInAddOrEditMode}
                          id="arrivalHouseNumber"
                          name="arrivalHouseNumber"
                          helperText={
                            touched.arrivalHouseNumber
                              ? errors.arrivalHouseNumber
                              : ""
                          }
                          error={
                            touched.arrivalHouseNumber &&
                            Boolean(errors.arrivalHouseNumber)
                          }
                          label={"Huisnummer"}
                          value={values.arrivalHouseNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs>
                        <DriveEtaIcon className="line--icon" />
                        <TextField
                          className="line--input-medium"
                          disabled={!isInAddOrEditMode}
                          id="totalDrivingDistance"
                          name="totalDrivingDistance"
                          helperText={
                            touched.totalDrivingDistance
                              ? errors.totalDrivingDistance
                              : ""
                          }
                          error={
                            touched.totalDrivingDistance &&
                            Boolean(errors.totalDrivingDistance)
                          }
                          onKeyPress={(e) => catchEnter(e, handleSubmit)}
                          value={values.totalDrivingDistance}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label={"Aantal kilometers"}
                        />
                        <div
                          className={`line--checkbox ${
                            isInAddOrEditMode ? "line--checkbox-active" : ""
                          }`}
                        >
                          Retour
                          <Checkbox
                            disabled={!isInAddOrEditMode}
                            id="isRetour"
                            name="isRetour"
                            type="checkbox"
                            color="secondary"
                            checked={values.isRetour}
                            onChange={handleChange}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <Tooltip
                          title={isInAddOrEditMode ? "Opslaan" : "Aanpassen"}
                          aria-label={
                            isInAddOrEditMode ? "opslaan" : "aanpassen"
                          }
                        >
                          <Button
                            onClick={() =>
                              isInAddOrEditMode
                                ? handleSubmit()
                                : dispatch(
                                    allActions.driveExpensesActions.editCurrentEntry(
                                      values.entryId
                                    )
                                  )
                            }
                          >
                            {isInAddOrEditMode ? <CheckIcon /> : <EditIcon />}
                          </Button>
                        </Tooltip>
                        <Tooltip
                          title={isInAddOrEditMode ? "Sluiten" : "Verwijderen"}
                          aria-label={
                            isInAddOrEditMode ? "sluiten" : "verwijderen"
                          }
                        >
                          <Button
                            onClick={() =>
                              isInAddOrEditMode
                                ? dispatch(
                                    allActions.driveExpensesActions.exitCreateOrUpdateMode()
                                  )
                                : dispatch(
                                    allActions.driveExpensesActions.deleteDriveExpenses(
                                      values.entryId
                                    )
                                  )
                            }
                          >
                            {isInAddOrEditMode ? <BlockIcon /> : <DeleteIcon />}
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </div>
            );
          }}
        </Formik>
      )}
    </React.Fragment>
  );
};

export default Line;
