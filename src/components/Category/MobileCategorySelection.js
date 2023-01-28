import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const MobileCategorySelection = ({
  allCategories,
  mobileCategoryChangeHandler,
}) => {
  const [category, setCategory] = useState("Her şey");
  const categoryChangeHandler = (e) => {
    mobileCategoryChangeHandler(e);
    setCategory(e.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
      <Select
        SelectDisplayProps={{ style: { height: "10px" } }}
        labelId="demo-simple-name-label"
        id="demo-simple-name"
        label="Kategori"
        onChange={categoryChangeHandler}
        value={category}
      >
        {allCategories?.map((name) => (
          <MenuItem sx={{ minHeight: "auto" }} key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MobileCategorySelection;
