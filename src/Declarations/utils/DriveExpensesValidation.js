import { object, string, number } from "yup";

// Yup variables
const postCodeRegEx = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
const minPostCodeLength = 5;
const maxPostCodeLength = 7;
const minHouseNumberLength = 1;
const maxHouseNumberLength = 6;
const minTotalDrivingDistanceLength = 1;
const maxTotalDrivingDistanceLength = 999;

// Error messages
const genericPostCodeError = "Voer een geldige postcode in";
const dutchPostCodeError = "Voer een geldige Nederlandse postcode in";
const minHouseNumberLengthError = "Min. 1 teken";
const maxHouseNumberLengthError = "Max. 6 tekens";
const genericHouseNumberError = "Voer een geldig huisnummer in";
const minTotalDrivingDistanceError = "Min. 1 km";
const maxTotalDrivingDistanceError = "Niet overdrijven!!";
const negativeTotalDrivingDistanceError = "Terugrit via retourknop!";
const integerTotalDrivingDistanceError = "Voer een getal in";
const genericTotalDrivingDistanceError = "Vul uw gereden kilometers in";

export const DriveExpensesValidation = object({
  departureZipcode: string()
    .trim()
    .matches(postCodeRegEx, genericPostCodeError)
    .min(minPostCodeLength)
    .max(maxPostCodeLength)
    .required(dutchPostCodeError),
  departureHouseNumber: string()
    .min(minHouseNumberLength, minHouseNumberLengthError)
    .max(maxHouseNumberLength, maxHouseNumberLengthError)
    .required(genericHouseNumberError),
  arrivalZipcode: string()
    .trim()
    .matches(postCodeRegEx, genericPostCodeError)
    .min(minPostCodeLength)
    .max(maxPostCodeLength)
    .required(dutchPostCodeError),
  arrivalHouseNumber: string()
    .min(minHouseNumberLength, minHouseNumberLengthError)
    .max(maxHouseNumberLength, maxHouseNumberLengthError)
    .required(genericHouseNumberError),
  totalDrivingDistance: number()
    .min(minTotalDrivingDistanceLength, minTotalDrivingDistanceError)
    .max(maxTotalDrivingDistanceLength, maxTotalDrivingDistanceError)
    .positive(negativeTotalDrivingDistanceError)
    .integer(integerTotalDrivingDistanceError)
    .required(genericTotalDrivingDistanceError),
});

export default DriveExpensesValidation;
