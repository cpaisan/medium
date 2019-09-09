import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Downshift from "downshift";

const SearchInput = props => {
  const {
    searchText,
    onSearchChange,
    classes,
    searchHistory,
    setSearchText
  } = props;
  return (
    <Downshift
      inputValue={searchText}
      onChange={suggestion => setSearchText(suggestion)}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getRootProps,
        isOpen,
        openMenu,
        inputValue
      }) => {
        const { onChange, ref, ...restInputProps } = getInputProps({
          placeholder: "Search Medium...",
          onFocus: openMenu,
          onChange: e => onSearchChange(e)
        });
        return (
          <div className={classes.inputRoot}>
            <TextField
              className={classes.searchInput}
              InputProps={{
                inputRef: ref,
                onChange
              }}
              {...restInputProps}
            />
            {isOpen ? (
              <Paper className={classes.history} square>
                {searchHistory.map((entry, index) => (
                  <MenuItem
                    component="div"
                    {...getItemProps({ item: entry, key: entry, index })}
                  >
                    {entry}
                  </MenuItem>
                ))}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
};

export default SearchInput;
