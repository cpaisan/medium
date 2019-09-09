import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import SearchInput from "components/SearchInput";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateAreas: `
      "nav"
      "content"
    `,
    padding: "32px 0 32px 0",
    height: "calc(100vh - 64px)",
    gridTemplateRows: "max-content auto"
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
    paddingTop: 8,
    paddingBottom: 8,
    gridArea: "content",
    display: "grid",
    gridTemplateColumns: "50%",
    height: "calc(100vh - 100px)",
    overflow: "auto",
    justifyContent: "center",
    "& img": {
      maxWidth: "100%"
    }
  },
  card: {
    height: "max-content",
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8
  },
  button: {
    height: "max-content"
  },
  history: {
    width: 300,
    position: "absolute"
  },
  buttonLoader: {
    position: "absolute",
    placeSelf: "center"
  },
  contentLoader: {
    placeSelf: "center",
    gridArea: "content"
  },
  error: {
    placeSelf: "center",
    gridArea: "content",
    color: "red"
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSearchChange = ({ target: { value } }) => setSearchText(value);

  const requestMediumFeed = async () => {
    if (error) setError(false);
    try {
      const apiResponse = await fetch(`${API_URL}/${searchText}`);
      const {
        items = [],
        searchHistory: updatedSearchHistory = []
      } = await apiResponse.json();
      setFeed(items);
      setSearchHistory(updatedSearchHistory);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
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
          disabled={loading}
          onClick={e => {
            setLoading(true);
            requestMediumFeed(e);
          }}
          className={classes.button}
        >
          Search{" "}
          {loading && (
            <CircularProgress
              color="secondary"
              size={30}
              className={classes.buttonLoader}
            />
          )}
        </Button>
      </div>
      {loading && (
        <CircularProgress
          color="secondary"
          size={80}
          className={classes.contentLoader}
        />
      )}
      {error && (
        <Typography variant="h6" className={classes.error}>
          There was an error requesting the Medium feed. Please try again{" "}
        </Typography>
      )}
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
