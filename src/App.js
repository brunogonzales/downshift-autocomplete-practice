import React from "react";
import Downshift from "downshift";
import { all as starWarsNames } from "starwars-names";
import matchSorter from "match-sorter";

const items = starWarsNames.map((name) => ({
  name,
  id: name.toLocaleLowerCase(),
}));

const itemToString = (item) => (item ? item.name : "");

const getItems = (value) =>
  value ? matchSorter(items, value, { keys: ["name"] }) : items;

function App() {
  return (
    <div className="App">
      <h1>Autocomplete exercise</h1>
      <Downshift itemToString={itemToString}>
        {({
          getLabelProps,
          getInputProps,
          getMenuProps,
          getItemProps,
          getToggleButtonProps,

          clearSelection,

          highlightedIndex,
          selectedItem,
          inputValue,
          isOpen,
        }) => (
          <div>
            <label {...getLabelProps()}>Select a Star Wars character</label>
            <input {...getInputProps()} />
            <button {...getToggleButtonProps()}>
              {isOpen ? "close" : "open"}
            </button>
            {selectedItem ? <button onClick={clearSelection}>x</button> : null}
            <ul
              {...getMenuProps({
                style: { maxHeight: 200, overflowY: "scroll" },
              })}
            >
              {isOpen
                ? getItems(inputValue).map((item, index) => (
                    <li
                      {...getItemProps({
                        item,
                        key: item.id,
                        style: {
                          backgroundColor:
                            index === highlightedIndex ? "gray" : null,
                        },
                      })}
                    >
                      {item.name}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
}

export default App;
