import { Box } from "@mui/system";

const CategoryCorner = ({category}) => {
  return (
    <Box
      sx={{
        width: "40px",
        height: "18px",
        color: "white",
        backgroundColor: "black",
        fontSize: "10px",
        fontWeight: "700",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}
    >
      {category}
    </Box>
  );
};

export default CategoryCorner;
