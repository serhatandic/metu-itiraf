import { Box } from "@mui/system";

const CategorySelectItem = ({ category }) => {
  return (
    <Box sx={{fontFamily:"Rubik Mono One , sans-serif", color:"#414141"}}>
        {category}
    </Box>
  );
};

export default CategorySelectItem;
