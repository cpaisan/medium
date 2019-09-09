import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateAreas: `
      "nav"
      "content"
    `,
    gridTemplateColumns: "auto",
    padding: 32
  },
  nav: {
    gridArea: "nav",
    display: "flex",
    placeSelf: "center",
    width: "max-content",
    justifyContent: "space-around"
  },
  searchInput: {
    width: 300,
    marginRight: 16
  }
});

function App() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");

  const onSearchChange = ({ target: { value } }) => setSearchText(value);

  const requestMediumFeed = async () => {
    // TODO: make API request
  };
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <TextField
          className={classes.searchInput}
          placeholder="Search Medium..."
          value={searchText}
          onChange={onSearchChange}
        />
        <Button variant="contained" color="primary" onClick={requestMediumFeed}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default App;
