import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import SearchInput from "components/SearchInput";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateAreas: `
      "nav"
      "content"
    `,
    padding: 32
  },
  nav: {
    gridArea: "nav",
    placeSelf: "center",
    display: "flex"
  },
  searchInput: {
    width: 300,
    marginRight: 16
  },
  content: {
    marginTop: 16,
    gridArea: "content",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& img": {
      maxWidth: "100%"
    }
  },
  card: {
    height: "max-content",
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    maxWidth: "32%"
  },
  inputRoot: {
    display: "inline-block"
  },
  button: {
    height: "max-content"
  },
  history: {
    width: 300
  }
});

const API_URL = "http://localhost:3001/medium";
const DATE_OPTIONS = {
  day: "numeric",
  month: "short",
  year: "numeric"
};

function App() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [feed, setFeed] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const onSearchChange = ({ target: { value } }) => setSearchText(value);

  const requestMediumFeed = async () => {
    try {
      const apiResponse = await fetch(`${API_URL}/${searchText}`);
      const {
        items = [],
        searchHistory: updatedSearchHistory = []
      } = await apiResponse.json();
      setFeed(items);
      setSearchHistory(updatedSearchHistory);
    } catch (e) {
      // TODO: display error
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <SearchInput
          classes={classes}
          searchText={searchText}
          onSearchChange={onSearchChange}
          searchHistory={searchHistory}
          setSearchText={setSearchText}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={requestMediumFeed}
          className={classes.button}
        >
          Search
        </Button>
      </div>
      {feed.length > 0 && (
        <div className={classes.content}>
          {feed.map(({ title = "", isoDate = null, content }) => (
            <Card key={title} className={classes.card}>
              <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="h6">
                  Published:{" "}
                  {new Date(isoDate).toLocaleDateString("en-US", DATE_OPTIONS)}
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
