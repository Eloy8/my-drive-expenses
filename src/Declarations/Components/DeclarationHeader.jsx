import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import AddIcon from "@material-ui/icons/Add";
import "../scss/DeclarationHeader.scss";

const DeclarationHeader = ({ addMode, editMode, setAddMode }) => (
  <AppBar position="static">
    <Toolbar>
      <EmojiTransportationIcon className="header--icon" />
      <Typography variant="h6">Rijkosten declareren</Typography>
      <div className="header--button">
        <Button
          variant="contained"
          disabled={addMode || editMode}
          onClick={() => setAddMode(true)}
        >
          <AddIcon />
          Nieuwe rijkosten declaratie
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

export default DeclarationHeader;
