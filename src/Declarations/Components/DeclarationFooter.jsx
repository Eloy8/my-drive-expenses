import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TimelineIcon from "@material-ui/icons/Timeline";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import "../scss/DeclarationFooter.scss";

const DeclarationFooter = ({ expensesList }) => {
  const calculateAmountOfKilometers = () => {
    let sum = 0;
    for (let i = 0; i < expensesList.length; i++) {
      const distanceInKilometer = expensesList[i].totalDrivingDistance;
      const totalDistance = expensesList[i].isRetour
        ? distanceInKilometer * 2
        : distanceInKilometer;
      // Needs to be multified by 1, otherwise will be concatenated as string to sum
      sum += totalDistance * 1;
    }
    return sum;
  };

  const totalAmountOfDeclarations = expensesList.length;
  const totalAmountOfKilometers = calculateAmountOfKilometers();
  const averageKilometersPerDeclaration =
    totalAmountOfKilometers &&
    totalAmountOfDeclarations &&
    (totalAmountOfKilometers / totalAmountOfDeclarations).toFixed(2);

  return (
    <BottomNavigation className="overview overview--footer" showLabels>
      <BottomNavigationAction
        className="overview--action"
        disabled
        label={`${totalAmountOfKilometers} km`}
        icon={<DirectionsCarIcon />}
      />
      <BottomNavigationAction
        className="overview--action"
        disabled
        label={`${totalAmountOfDeclarations} ${
          totalAmountOfDeclarations === 1 ? "rit" : "ritten"
        }`}
        icon={<HomeWorkIcon />}
      />
      <BottomNavigationAction
        className="overview--action"
        disabled
        label={`${averageKilometersPerDeclaration} km/rit`}
        icon={<TimelineIcon />}
      />
    </BottomNavigation>
  );
};

export default DeclarationFooter;
