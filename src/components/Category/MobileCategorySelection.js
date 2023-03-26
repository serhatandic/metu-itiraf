import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

const MobileCategorySelection = ({
  mobileCategoryChangeHandler,
}) => {
  const [categories, setCategories] = useState([]);

  const categoryChangeHandler = (e, newCategory) => {
    setCategories((prev) => {
      if (prev.includes(e.target.value)) {
        // if we already have the category included in the array, remove (toggle) it
        const newCategories = prev.filter((item) => item !== e.target.value);
        mobileCategoryChangeHandler(newCategories);
        return newCategories;
      } else {
        mobileCategoryChangeHandler([newCategory, ...prev]);
        return [newCategory, ...prev];
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "50%",
        gap: 1,
        justifyContent: "center",
      }}
    >
      <ToggleButtonGroup
        size="small"
        value={categories}
        exclusive
        onChange={(e, newCategory) => {
          categoryChangeHandler(e, newCategory);
        }}
      >
        <ToggleButton value="Aşk">Aşk</ToggleButton>
        <ToggleButton value="Hayal">Hayal</ToggleButton>
        <ToggleButton value="Deneyim">Deneyim</ToggleButton>
        <ToggleButton value="Suçluluk">Suçluluk</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        value={categories}
        exclusive
        onChange={(e, newCategory) => {
          categoryChangeHandler(e, newCategory);
        }}
      >
        <ToggleButton value="Acı">Acı</ToggleButton>
        <ToggleButton value="Yalan">Yalan</ToggleButton>
        <ToggleButton value="Rastlantı">Rastlantı</ToggleButton>
        <ToggleButton value="Geyik">Geyik</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        value={categories}
        exclusive
        onChange={(e, newCategory) => {
          categoryChangeHandler(e, newCategory);
        }}
      >
        <ToggleButton value="Aile">Aile</ToggleButton>
        <ToggleButton value="Okul">Okul</ToggleButton>
        <ToggleButton value="Gerçekler">Gerçekler</ToggleButton>
        <ToggleButton value="Diğer">Diğer</ToggleButton>
      </ToggleButtonGroup>
    </Box>
    // <FormControl fullWidth>
    //   <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
    //   <Select
    //     SelectDisplayProps={{ style: { height: "10px" } }}
    //     labelId="demo-simple-name-label"
    //     id="demo-simple-name"
    //     label="Kategori"
    //     onChange={categoryChangeHandler}
    //     value={category}
    //   >
    //     {allCategories?.map((name) => (
    //       <MenuItem sx={{ minHeight: "auto" }} key={name} value={name}>
    //         {name}
    //       </MenuItem>
    //     ))}
    //   </Select>
    // </FormControl>
  );
};

export default MobileCategorySelection;
